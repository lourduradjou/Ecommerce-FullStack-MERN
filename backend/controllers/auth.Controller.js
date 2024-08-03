// Import middleware and utility functions
const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')
const catchAsycnError = require('../middlewares/catchAsyncError.Middleware')
const UserModel = require('../models/user.model')
const sendEmail = require('../utils/email')
const ErrorHandler = require('../utils/errorHandlerClass')
const sendToken_And_Response = require('../utils/JWTUtils')

/*
	Note: This is my personal note to work with better comments hope you like it..
	*: Emphasizes important notes or critical information.
	!: Indicates warnings or points of concern.
	TODO: Marks incomplete tasks or future improvements.
	?: Raises questions or highlights uncertainties.

	* Information:
		- This file contains handlers for user registration and login functionality.
		- Uses middleware to handle async errors and token management.

	! Note:
		- Ensure that `catchAsycnError` is correctly imported if there's a typo. It should match the correct function name.
		- Ensure `JWTUtils` matches the actual file name for consistency.
	
	TODO:
		- Consider adding validation for input fields to improve security and robustness.
		- Implement rate limiting to protect endpoints from abuse.
	
	? Question:
		- Do we need to handle additional cases for user roles or permissions in the future?
*/

// Handler for registering a new user
exports.registerUser = catchAsycnError(async (req, res, next) => {
	const { email, name, password, avatar, role } = req.body

	// Create a new user in the database
	const user = await UserModel.create({
		name,
		email,
		password,
		avatar,
		role,
	})

	// Generate a JWT token for the newly registered user
	const token = user.getJwtToken()

	// Send the token and response to the client
	sendToken_And_Response(user, 201, res)
})

// Handler for logging in a user
exports.loginUser = catchAsyncError(async (req, res, next) => {
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
	// * await is needed here so that the function would wait until it gets a response
	if (!(await user.isValidPassword(password)))
		return next(new ErrorHandler('Invalid Email or Password', 401))

	// Generate and send a JWT token and response to the client
	sendToken_And_Response(user, 201, res)
})

exports.logoutUser = (req, res, next) => {
	// Clear the 'token' cookie by setting it to null and setting an expiry date in the past
	// This effectively logs out the user by invalidating their session token
	res.cookie('token', null, {
		expires: new Date(Date.now()), // Expiry date set to now to delete the cookie
		httpOnly: true, // Ensures the cookie is only accessible by the server
	})
		.status(200) // Send a 200 OK response status
		.json({
			success: true, // Indicates the logout was successful
			message: 'Logged Out', // Message to be sent in the response
		})
}

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	// Find the user in the database using the provided email
	const user = await UserModel.findOne({ email: req.body.email })

	// If no user is found with the provided email, return a 404 error
	if (!user) {
		return next(new ErrorHandler('User not found with this email', 404))
	}

	// Generate a reset token for the user
	// This token will be used to reset the user's password
	const resetToken = await user.getResetToken()
	// Save the user document with the reset token and its expiration time
	await user.save({ validateBeforeSave: false })

	// Create the URL for resetting the password using the generated token
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/password/reset/${resetToken}`

	// Create the message to be sent to the user
	const message = `Your password reset URL is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

	try {
		// Send the password reset email to the user
		await sendEmail({
			email: user.email,
			subject: 'EcommerceIndia Password Recovery',
			message: message,
		})

		// Send a success response with the email address
		res.status(200).json({
			success: true,
			message: `Email was sent to ${user.email}`, // Note: 'sended' should be corrected to 'sent'
		})
	} catch (err) {
		// If sending the email fails, clear the reset token and its expiration time
		user.resetPasswordToken = undefined
		user.resetPasswordTokenExpire = undefined
		await user.save({ validateBeforeSave: false })

		// Pass the error to the error handling middleware
		return next(new ErrorHandler(err.message, 500))
	}
})
