const catchAsyncError = require('../middlewares/catchAsyncError.Middleware')
const Order = require('../models/order.Model')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandlerClass')

// * ------------------------------------ Admin related routes for the orders ---------------------------------------------------

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

//Admin: Update Order/ Order Status
//Endpoint: /api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
	// Find the order by ID and populate the user details (name and email)
	const order = await Order.findById(req.params.id)

	if (order.orderStatus === 'Delivered') {
		return next(new ErrorHandler('Order has been already delivered!', 400))
	}

	//updating the product stock of each order item
	order.orderItems.forEach(async (orderItem) => {
		await updateStock(orderItem.product, orderItem.quantity)
	})

	order.orderStatus = req.body.orderStatus
	order.deliveredAt = Date.now()
    await order.save()

	// Send a success response with the order details
	res.status(200).json({
		success: true,
	})
})

async function updateStock(productId, quantity) {
	const product = await Product.findById(productId)
	product.stock = product.stock - quantity
	await product.save({ validateBeforeSave: false })
}
