const catchAsyncError = require('../middlewares/catchAsyncError.Middleware'); // Middleware to handle asynchronous errors
const Order = require('../models/order.Model'); // Order model for interacting with the orders collection
const Product = require('../models/productModel'); // Product model for interacting with the products collection
const ErrorHandler = require('../utils/errorHandlerClass'); // Custom error handler class

// * ------------------------------------ Admin related routes for the orders ---------------------------------------------------

// Admin: Retrieves all the orders in the db (check the role === admin)
// Endpoint: /api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
    // Find all orders in the database
    const orders = await Order.find();

    // If no orders are found, return a 404 error
    if (!orders) {
        return next(new ErrorHandler(`No order is there!`, 404));
    }

    // Calculate the total price of all orders
    let totalPrice = 0;
    orders.forEach((order) => (totalPrice += order.totalPrice));

    // Send a success response with the order details and total price
    res.status(200).json({
        success: true,
        totalPrice,
        orders,
    });
});

// Admin: Update Order/ Order Status
// Endpoint: /api/v1/order/update/:id
async function updateStock(productId, quantity) {
    // Find the product by ID
    const product = await Product.findById(productId);

    // Update the product stock by subtracting the quantity
    product.stock -= quantity;

    // Save the product with validation turned off (since the stock change is not a critical validation)
    await product.save({ validateBeforeSave: false });
}

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // If the order is not found, return a 404 error
    if (!order) {
        return next(new ErrorHandler(`No order is there!`, 404));
    }

    // Check if the order has already been delivered
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400));
    }

    // Update the product stock for each item in the order
    await Promise.all(order.orderItems.map(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity);
    }));

    // Update the order status and delivery date
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    // Send a success response
    res.status(200).json({
        success: true,
    });
});

// Admin: Delete Order
// Endpoint: /api/v1/order/delete/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // If the order is not found, return a 404 error
    if (!order) {
        return next(new ErrorHandler(`No order is there!`, 404));
    }

    // Delete the order using deleteOne
    await Order.deleteOne({ _id: req.params.id });

    // Send a success response
    res.status(200).json({
        success: true,
    });
});
