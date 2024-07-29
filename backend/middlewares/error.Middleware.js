const ErrorHandler = require('../utils/errorHandlerClass')

module.exports = (errObj, req, res, next) => {
	errObj.statusCode = errObj.statusCode || 500

	if (process.env.NODE_ENV == 'production') {
		let message = errObj.message
		let error = { ...errObj }

		//Handling validation error and chaning the message and creating a error object to send to the frontend
		if (errObj.name == 'ValidationError') {
			message = Object.values(errObj.errors).map((value) => value.message)
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

	if (process.env.NODE_ENV == 'development') {
		res.status(errObj.statusCode).json({
			success: false,
			message: errObj.message,
			stack: errObj.stack,
			error: errObj,
		})
	}
}
