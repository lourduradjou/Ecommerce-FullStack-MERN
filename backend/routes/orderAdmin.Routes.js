const express = require('express'); // Import Express library
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require('../middlewares/authenticate.Middleware'); // Import authentication and authorization middleware
const {
    orders,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderAdmin.Controller'); // Import controller functions

// Creating a new router instance
const router = express.Router(); // Initialize a new router object

// Route to get all orders
// This route requires authentication and admin authorization
router.route('/orders').get(
    isAuthenticatedUser, // Middleware to check if the user is authenticated
    authorizeRoles('admin'), // Middleware to check if the user has admin role
    orders // Controller function to handle the request for retrieving orders
);

// Route to update an order by ID
// This route requires authentication and admin authorization
router.route('/order/update/:id').put(
    isAuthenticatedUser, // Middleware to check if the user is authenticated
    authorizeRoles('admin'), // Middleware to check if the user has admin role
    updateOrder // Controller function to handle the request for updating an order
);

// Route to delete an order by ID
// This route requires authentication and admin authorization
router.route('/order/delete/:id').delete(
    isAuthenticatedUser, // Middleware to check if the user is authenticated
    authorizeRoles('admin'), // Middleware to check if the user has admin role
    deleteOrder // Controller function to handle the request for deleting an order
);

module.exports = router; // Export the router instance to be used in other parts of the application
