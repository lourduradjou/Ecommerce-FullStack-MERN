const express = require('express')
const { newOrder } = require('../controllers/order.Controller')
const {
	isAuthenticatedUser,
} = require('../middlewares/authenticate.Middleware')
const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)

module.exports = router
