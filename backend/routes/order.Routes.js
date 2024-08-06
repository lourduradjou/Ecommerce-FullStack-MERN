const express = require('express')
const { newOrder, getSingleOrder } = require('../controllers/order.Controller')
const {
	isAuthenticatedUser,
} = require('../middlewares/authenticate.Middleware')
const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)

module.exports = router
