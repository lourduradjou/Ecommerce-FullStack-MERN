const mongoose = require('mongoose')
var validator = require('email-validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		validate: [validator.validate, 'Please enter valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter password'],
		minlength: [8, 'Password has to be atleast 8 Characters'],
	},
	avatar: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
	},
	resetPasswordToken: String,
	resetPasswordTokenExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

userSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 10)
})

const Model = mongoose.model('User', userSchema)
module.exports = Model
