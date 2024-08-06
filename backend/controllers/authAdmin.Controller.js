// Importing required modules
const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandlerClass');
const catchAsyncError = require('../middlewares/catchAsyncError.Middleware');

// * ---------------------------- Admin Controllers (Update, Create, Delete, Read) -> (CRUD) --------------------------------

// Get all users from the database
// Endpoint:  /api/v1/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
	// Retrieve all users from the database
	const users = await User.find();
	// Send a response with status 200 and the retrieved users
	res.status(200).json({
		success: true,
		users,
	});
});

// Get a specific user by their ID
// Endpoint:  /api/v1/admin/user/:id
exports.getSpecificUser = catchAsyncError(async (req, res, next) => {
	// Retrieve a specific user from the database using their ID from the request parameters
	const user = await User.findById(req.params.id);

	// If the user is not found, pass an error to the error handler with a 404 status code
	if (!user) return next(new ErrorHandler('User not found!', 404));

	// Send a response with status 200 and the retrieved user
	res.status(200).json({
		success: true,
		user,
	});
});

// Update user details by their ID
// Endpoint:  /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
	// Create an object with the new user data from the request body
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	// Find the user by ID and update their details with the new data
	// The 'new: true' option ensures the response contains the updated document
	// The 'runValidators: true' option ensures the update validates against the model's schema
	const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		newUserData,
		{
			new: true,
			runValidators: true, // Corrected from 'validators' to 'runValidators'
		}
	);

	// Send a response with status 200 and the updated user data
	res.status(200).json({
		success: true,
		updatedUser,
	});
});

// Delete a user by their ID
// Endpoint:  /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
	// Retrieve a specific user from the database using their ID from the request parameters
	const user = await User.findById(req.params.id);

	// If the user is not found, pass an error to the error handler with a 404 status code
	if (!user) return next(new ErrorHandler('User not found!', 404));

	// Remove the user from the database using findByIdAndDelete method
	await User.findByIdAndDelete(req.params.id);

	// Send a response indicating success and include a success message
	res.status(200).json({
		success: true,
		message: 'User deleted successfully',
	});
});
