const UserModel = require('../models/user.model')
const ErrorHandler = require('../utils/errorHandlerClass')
const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')

// * ---------------------------- Admin Controllers (Update, Create, Delete , Read) -> (CRUD) --------------------------------

//Get all users in the db
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
	const users = await UserModel.find() //retrieves all users in the db
	res.status(200).json({
		success: true,
		users,
	})
})

//Get a Specific user with his id
exports.getSpecificUser = catchAsyncError(async (req, res, next) => {
	const user = await UserModel.findById(req.params.id) //retrieve a specific user in the db

	if (!user) return next(new ErrorHandler('User not found!', 404))
	res.status(200).json({
		success: true,
		user,
	})
})

//Update
exports.updateUser = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	}

	const updatedUser = await UserModel.findByIdAndUpdate(
		req.params.id,
		newUserData,
		{
			new: true,
			validators: true,
		}
	)

	res.status(200).json({
		success: true,
		updatedUser,
	})
})

exports.deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await UserModel.findById(req.params.id) //retrieve a specific user in the db

	if (!user) return next(new ErrorHandler('User not found!', 404))

	//remove the user
	await user.remove()

	res.status(200).json({
		success: true,
		user,
	})
})
