// Import middleware and utility functions
const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')
const User = require('../models/user.model')
const sendEmail = require('../utils/email')
const ErrorHandler = require('../utils/errorHandlerClass')
const sendToken_And_Response = require('../utils/JWTUtils')
const crypto = require('crypto')

/*  Just Ignore this 😉
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

// ? Can we seperate the controllers further to improve the readability and workflow i feel we can extend


// Handler for registering a new user
// Endpoint: POST api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    // Destructure necessary fields from the request body
    const { email, name, password, avatar, role } = req.body;

    // Create a new user in the database with the provided details
    const user = await User.create({
        name,
        email,
        password,
        avatar,
        role,
    });

    // Generate a JWT token for the newly registered user
    const token = user.getJwtToken();

    // Send the token and user details in the response to the client
    sendToken_And_Response(user, 201, res);
});

// Handler for logging in a user
// Endpoint: POST api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
        return next(new ErrorHandler('Email or Password is missing', 400));
    }

    // Find the user by email and include the password field for verification
    const user = await User.findOne({ email }).select('+password');

    // If user does not exist, return an error
    if (!user) return next(new ErrorHandler('Invalid Email or Password', 401));

    // Validate the provided password against the stored hashed password
    if (!(await user.isValidPassword(password))) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Generate and send a JWT token and response to the client
    sendToken_And_Response(user, 200, res);
});

// Handler for logging out a user
// Endpoint: POST api/v1/logout
exports.logoutUser = (req, res, next) => {
    // Clear the 'token' cookie to log out the user by invalidating their session
    res.cookie('token', null, {
        expires: new Date(Date.now()), // Set expiry to now to delete the cookie
        httpOnly: true, // Ensure the cookie is only accessible by the server
    })
    .status(200) // Send a 200 OK response status
    .json({
        success: true, // Indicate that logout was successful
        message: 'Logged Out', // Message to be sent in the response
    });
};

// Function to handle forgot password request from the client
// Endpoint: POST api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    // Find the user in the database using the provided email
    const user = await User.findOne({ email: req.body.email });

    // If no user is found, return a 404 error
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Generate a reset token for the user to reset their password
    const resetToken = await user.getResetToken();
    // Save the user document with the reset token and its expiration time
    await user.save({ validateBeforeSave: false });

    // Create the URL for resetting the password using the generated token
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    // Create the message to be sent to the user
    const message = `Your password reset URL is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        // Send the password reset email to the user
        await sendEmail({
            email: user.email,
            subject: 'EcommerceIndia Password Recovery',
            message: message,
        });

        // Send a success response indicating the email was sent
        res.status(200).json({
            success: true,
            message: `Email was sent to ${user.email}`,
        });
    } catch (err) {
        // If sending the email fails, clear the reset token and its expiration time
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });

        // Pass the error to the error handling middleware
        return next(new ErrorHandler(err.message, 500));
    }
});

// Function to handle the reset password request from the client
// Endpoint: POST api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Get the token sent from the client via the URL parameter
    const requestedToken = req.params.token;

    // Hash the requested token to match the hashed token stored in the database
    const hashedToken = crypto.createHash('sha256').update(requestedToken).digest('hex');

    // Find the user based on the hashed token and its expiration time
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpire: {
            $gt: Date.now(), // Check if the token is not expired
        },
    });

    // If no user is found, the token is invalid or expired
    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    // Check if the provided password matches the confirm password
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    // Update the user's password and clear the reset token and expiration time
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    // Save the updated user document to the database
    await user.save({ validateBeforeSave: false });

    // Generate a new JWT token for the user and send it in the response
    sendToken_And_Response(user, 200, res);
});

// Gets the user profile details excluding the password from the database
// Endpoint: GET api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    // Retrieve the user details from the database using the user ID from the request
    const user = await User.findById(req.user.id); // req.user.id is assumed to be set by authentication middleware

    // Respond with the user details, excluding the password
    res.status(200).json({
        success: true,
        user, // The user object contains the profile details
    });
});

// Change password of the user
// Endpoint: PUT api/v1/password/change
exports.changePassword = catchAsyncError(async (req, res, next) => {
    // Retrieve the user details from the database, including the hashed password for comparison
    const user = await User.findById(req.user.id).select('+password'); // '+password' ensures the password field is included

    // Get the old password from the request body
    const oldPassword = req.body.oldPassword;

    // Check if the provided old password is valid
    if (!(await user.isValidPassword(oldPassword))) {
        // If the old password is incorrect, return an error response
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    // Update the user's password with the new password from the request body
    user.password = req.body.newPassword;

    // Save the updated user details back to the database
    await user.save();

    // Respond with a success message indicating the password change was successful
    res.status(200).json({
        success: true,
        message: 'Password successfully changed',
    });
});

// Controller function to update the user profile
// Endpoint: PUT api/v1/update 
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    // Create an object to hold the new user data from the request body
    const newUserData = {
        name: req.body.name, // Get the name from the request body
        email: req.body.email // Get the email from the request body
    };

    // Find the user by their ID and update their data
    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true, // Return the updated document
        runValidators: true, // Validate the new data against the model's schema
    });

    // Respond with a success status and the updated user data
    res.status(200).json({
        success: true, // Indicate the operation was successful
        updatedUser // Return the updated user object
    });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
	const users = await User.find() //retrieves all users in the db
	res.status(200).json({
		success: true,
		users,
	})
})