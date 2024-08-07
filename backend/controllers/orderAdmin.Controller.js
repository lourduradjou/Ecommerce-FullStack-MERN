const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')
const Order = require('../models/order.Model')
const ErrorHandler = require('../utils/errorHandlerClass')

//Admin: Retrieves all the orders in the db (check the role === admin)
//Endpoint : /api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
	// Find the order by ID and populate the user details (name and email)
	const orders = await Order.find()

	// If the order is not found, return an error
	if (!orders) {
		return next(new ErrorHandler(`No order is there!`, 404))
	}

	//Get the total price of the order
	let totalPrice = 0
	orders.forEach((order) => (totalPrice = totalPrice + order.totalPrice))

	// Send a success response with the order details
	res.status(200).json({
		success: true,
		totalPrice,
		orders,
	})
})
