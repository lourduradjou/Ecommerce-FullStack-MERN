// Importing the required modules
const express = require('express');
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require('../middlewares/authenticate.Middleware');
const {
	getAllUsers,
	getSpecificUser,
	updateUser,
	deleteUser,
} = require('../controllers/authAdmin.Controller');

// Creating a new router instance
const router = express.Router();

// Route to get all users
// This route requires authentication and admin authorization
router
	.route('/admin/users')
	.get(
		isAuthenticatedUser,          // Middleware to check if the user is authenticated
		authorizeRoles('admin'),       // Middleware to check if the user has admin role
		getAllUsers                    // Controller function to handle the request
	);

// Route to get, update, or delete a specific user by their ID
// This route requires authentication and admin authorization
router
	.route('/admin/user/:id')
	.get(
		isAuthenticatedUser,          // Middleware to check if the user is authenticated
		authorizeRoles('admin'),       // Middleware to check if the user has admin role
		getSpecificUser                // Controller function to handle the request
	)
	.put(
		isAuthenticatedUser,          // Middleware to check if the user is authenticated
		authorizeRoles('admin'),       // Middleware to check if the user has admin role
		updateUser                    // Controller function to handle the request
	)
	.delete(
		isAuthenticatedUser,          // Middleware to check if the user is authenticated
		authorizeRoles('admin'),       // Middleware to check if the user has admin role
		deleteUser                    // Controller function to handle the request
	);

// Exporting the router for use in other parts of the application
module.exports = router;
