const jwt = require('jsonwebtoken') // Import the jsonwebtoken library for handling JWTs
const userModel = require('../models/user.model') // Import the user model to interact with the user collection
const ErrorHandler = require('../utils/errorHandlerClass') // Import the custom error handler class
const catchAsyncErrorMiddleware = require('./catchAsyncError.Middleware') // Import the utility for handling asynchronous errors

// Middleware to check if the user is authenticated
exports.isAuthenticatedUser = catchAsyncErrorMiddleware(
	async (req, res, next) => {
		// Extract the JWT token from cookies
		const { token } = req.cookies

		// If there is no token, return an error indicating that login is required
		if (!token) {
			return next(
				new ErrorHandler('Login first to access this resource', 401)
			)
		}

		// Verify the JWT token and decode it to extract user information (e.g., user ID)
		const decoded = jwt.verify(token, process.env.JWT_SECRET) // Use the secret key to decode the token

		// Fetch the user document from the database using the user ID obtained from the token
		req.user = await userModel.findById(decoded.id)

		// If no user is found, handle this situation
		if (!req.user) {
			return next(new ErrorHandler('User not found', 404))
		}

		// Proceed to the next middleware
		next()
	}
)

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if ( !roles.includes(req.user.role) ) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`), 401)
        }
        next()
    }
}














/*
    Personal Notes: ***------------------------------NOT IMPORTANT----------------------------------------***
    Named Exports:
        Export multiple values.
        Import with the exact names using curly braces.
        Example: exports.isAuthenticatedUser and const { isAuthenticatedUser } = require('./path/to/authMiddleware').

    Default Exports:
        Export a single value or function.
        Import without curly braces and name it whatever you like.
        Example: module.exports = isAuthenticatedUser and const isAuthenticatedUser = require('./path/to/authMiddleware').
*/
