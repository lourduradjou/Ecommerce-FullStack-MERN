// Import middleware and utility functions
const catchAsyncErrorMiddleware = require('../middlewares/catchAsyncError.Middleware')
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
	// * await is needed here so that the function would wait until it gets a response
	if (!(await user.isValidPassword(password)))
		return next(new ErrorHandler('Invalid Email or Password', 401))

	// Generate and send a JWT token and response to the client
	sendToken_And_Response(user, 201, res)
})

exports.logoutUser = (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	})
		.status(200)
		.json({
			sucesss: true,
			message: 'Logged Out',
		})
}

exports.forgotPassword = catchAsycnError(async (req, res, next) => {
	const user = await UserModel.findOne({ email: req.body.email }) //get the user data
	// console.log(user)
	if (!user)
		return next(new ErrorHandler('User not found with this email', 404))

	//generate a reset token
	const resetToken = user.getResetToken()
	await user.save({ validateBeforeSave: false })

	//create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/password/reset/${resetToken}`

	const message = `Your password reset url is as follows \n\n
					 ${resetUrl} \n\n 
					 If you have not requested this email, then ignore it`

	try {
		sendEmail({
			email: user.email,
			subject: 'EcommerceIndia Password Recovery',
			message: message,
		})

		res.status(200).json({
			success: true,
			message: `Email was sended to ${user.email}`,
		})
	} catch (err) {
		user.resetPasswordToken = undefined
		user.resetPasswordTokenExpire = undefined
		await user.save({ validateBeforeSave: false })
		return next(new ErrorHandler(err.message, 500))
	}
})
