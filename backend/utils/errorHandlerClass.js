// Define a custom error class named ErrorHandler that extends the built-in Error class
class ErrorHandler extends Error {
	// Constructor function to initialize the error object with a message and status code
	constructor(message, statusCode) {
		// Call the parent class's constructor with the message argument
		super(message)
		// Assign the provided status code to the instance
		this.statusCode = statusCode

		// Capture the stack trace for the error, excluding the constructor call from it
		// This helps in identifying where the error actually originated
		Error.captureStackTrace(this, this.constructor)
	}
}

// Export the ErrorHandler class to be used in other parts of the application
module.exports = ErrorHandler
