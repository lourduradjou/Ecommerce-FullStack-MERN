// Import necessary modules and middleware
const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')
const Order = require('../models/order.Model')
const ErrorHandler = require('../utils/errorHandlerClass')

// Endpoint: api/v1/order/new
// Create a new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
	// Destructure order details from the request body
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body

	// Create a new order in the database
	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(), // Set the paid date to the current date and time
		user: req.user.id, // Associate the order with the logged-in user
	})

	// Send a success response with the created order
	res.status(200).json({
		success: true,
		order,
	})
})

// Endpoint: api/v1/order/:id
// Get a single order by ID
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
	// Find the order by ID and populate the user details (name and email)
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	// If the order is not found, return an error
	if (!order) {
		return next(
			new ErrorHandler(
				`Order not found with this id: ${req.params.id}`,
				404
			)
		)
	}

	// Send a success response with the order details
	res.status(200).json({
		success: true,
		order,
	})
})

//Get Loggedin Users Orders
//Endpoint : /api/v1/myorders
exports.getMyOrders = catchAsyncError(async (req, res, next) => {
	// Find the order by ID and populate the user details (name and email)
	const order = await Order.find({ user: req.user.id })

	// If the order is not found, return an error
	if (!order) {
		return next(
			new ErrorHandler(
				`No order is there!`,
				404
			)
		)
	}

	// Send a success response with the order details
	res.status(200).json({
		success: true,
		order,
	})
})

