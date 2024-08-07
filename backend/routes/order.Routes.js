const express = require('express')
const {
	newOrder,
	getSingleOrder,
	getMyOrders,
} = require('../controllers/order.Controller')
const {
	isAuthenticatedUser,
} = require('../middlewares/authenticate.Middleware')
const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/myorders').get(isAuthenticatedUser, getMyOrders)

module.exports = router
