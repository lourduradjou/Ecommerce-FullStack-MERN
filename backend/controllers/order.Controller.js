const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')
const Order = require('../models/order.Model')
const ErrorHandler = require('../utils/errorHandlerClass')

//Endpoint: api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user.id,
	})

	res.status(200).json({
		success: true,
		order,
	})
})

//Endpoint: api/v1/order/:id
//Get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)
	if (!order) {
		return next(
			new ErrorHandler(
				`Order not found with this id: ${req.params.id}`,
				404
			)
		)
	}

	res.status(200).json({
		success: true,
		order,
	})
})
