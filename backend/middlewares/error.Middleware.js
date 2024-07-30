const ErrorHandler = require('../utils/errorHandlerClass') //ErrorHandler class

/* 
	This function handles the error 
	specific to production and development time 
	and send the error message accordingly to the users and developers
*/
module.exports = (errObj, req, res, next) => {
	errObj.statusCode = errObj.statusCode || 500 //sets the status code

	//handles the error for the production
	if (process.env.NODE_ENV == 'production') {
		let message = errObj.message //get the message
		let error = new ErrorHandler(message, 400) //create a error handler class to throw back

		//Handling validation error and chaning the message and creating a error object to send to the frontend
		if (errObj.name == 'ValidationError') {
			message = Object.values(errObj.errors).map((value) => value.message) //takes the message values from the errorObject 
			error = new ErrorHandler(message, 400)
		}

		//Handling Cast error and chaning the message and creating a error object to send to the frontend
		if (errObj.name == 'CastError') {
			message = `Resource not found: ${errObj.path}`
			error = new ErrorHandler(message, 400)
		}

		res.status(errObj.statusCode).json({
			success: false,
			message: error.message || 'Internal Server Error',
		})
	}

	//handles the error for the development
	if (process.env.NODE_ENV == 'development') {
		res.status(errObj.statusCode).json({
			success: false,
			message: errObj.message,
			stack: errObj.stack,
			error: errObj,
		})
	}
}
