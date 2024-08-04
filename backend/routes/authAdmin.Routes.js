// Importing the required modules
const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate.Middleware')
const { getAllUsers, getSpecificUser, updateUser, deleteUser } = require('../controllers/authAdmin.Controller')

// Creating a new router instance
const router = express.Router()

router.router('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSpecificUser)
                                .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
                                 .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

// Exporting the router for use in other parts of the application
module.exports = router
