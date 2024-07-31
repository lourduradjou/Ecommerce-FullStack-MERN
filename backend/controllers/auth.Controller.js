const catchAsyncErrorMiddleware = require('../middlewares/catchAsyncError.Middleware')
const catchAsycnError = require('../middlewares/catchAsyncError.Middleware')
const UserModel = require('../models/user.model')

exports.registerUser = catchAsycnError(async (req, res, next) => {
	const { email, name, password, avatar } = req.body
	const user = await UserModel.create({
		name,
		email,
		password,
		avatar,
	})

    res.status(201).json({
        success: true,
        user
    })
})

exports.loginUser = catchAsyncErrorMiddleware(async (req, res, next) => {
	const {email, password} = req.body 
	
})