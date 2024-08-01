// Import middleware and utility functions
const catchAsyncErrorMiddleware = require('../middlewares/catchAsyncError.Middleware')
const catchAsycnError = require('../middlewares/catchAsyncError.Middleware')
const UserModel = require('../models/user.model') 
const ErrorHandler = require('../utils/errorHandlerClass')
const sendToken_And_Response = require('../utils/JWTUtils')

// Handler for registering a new user
exports.registerUser = catchAsycnError(async (req, res, next) => {
	const { email, name, password, avatar } = req.body

	// Create a new user in the database
	const user = await UserModel.create({
		name,
		email,
		password,
		avatar,
	})

	// Generate a JWT token for the newly registered user
	const token = user.getJwtToken()

	// Send the token and response to the client
	sendToken_And_Response(user, 201, res)
})

// Handler for logging in a user
exports.loginUser = catchAsyncErrorMiddleware(async (req, res, next) => {
	const { email, password } = req.body

	// Check if both email and password are provided
	if (!email || !password) {
		return next(new ErrorHandler('Email or Password is missing', 400))
	}

	// Find the user by email and include the password field
	const user = await UserModel.findOne({ email }).select('+password')

	// Check if the user exists
	if (!user) return next(new ErrorHandler('Invalid Email or Password', 401))

	// Check if the provided password is valid
	if (!(await user.isValidPassword(password)))
		return next(new ErrorHandler('Invalid Email or Password', 401))

	// Generate and send a JWT token and response to the client
	sendToken_And_Response(user, 201, res)
})
