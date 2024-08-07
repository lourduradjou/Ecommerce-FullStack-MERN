const express = require('express')
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require('../middlewares/authenticate.Middleware')
const { orders, updateOrder } = require('../controllers/orderAdmin.Controller')

// Creating a new router instance
const router = express.Router()

// Route to get all orders
// This route requires authentication and admin authorization
router.route('/orders').get(
	isAuthenticatedUser, // Middleware to check if the user is authenticated
	authorizeRoles('admin'), // Middleware to check if the user has admin role
	orders // Controller function to handle the request
)

router.route('/order/update/:id').put(
	isAuthenticatedUser, // Middleware to check if the user is authenticated
	authorizeRoles('admin'), // Middleware to check if the user has admin role
	updateOrder // Controller function to handle the request
)
module.exports = router
