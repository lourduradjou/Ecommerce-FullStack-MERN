// Importing the required modules
const express = require('express')
const {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	getUserProfiel,
} = require('../controllers/auth.Controller')
const { isAuthenticatedUser } = require('../middlewares/authenticate.Middleware')

// Creating a new router instance
const router = express.Router()

// Defining the routes for user authentication
// POST request to register a new user
router.route('/register').post(registerUser)

// POST request to log in a user
router.route('/login').post(loginUser)

// GET request to log out a user
router.route('/logout').get(logoutUser)

// POST request to initiate password reset process
router.route('/password/forgot').post(forgotPassword)

// POST request to reset the password using the provided token
router.route('/password/reset/:token').post(resetPassword)

// GET request to get the user profile
router.route('/myprofile').get(isAuthenticatedUser, getUserProfiel)

// Exporting the router for use in other parts of the application
module.exports = router
