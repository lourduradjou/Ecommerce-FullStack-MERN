const mongoose = require('mongoose')

// Define the order schema
const orderSchema = mongoose.Schema({
	// Shipping information of the order
	shippingInfo: {
		address: {
			type: String,
			required: true, // Address where the order will be shipped
		},
		country: {
			type: String,
			required: true, // Country of the shipping address
		},
		city: {
			type: String,
			required: true, // City of the shipping address
		},
		phoneNo: {
			type: String,
			required: true, // Contact phone number for the shipping address
		},
		postelCode: {
			type: String,
			required: true, // Postal code of the shipping address
		},
	},
	// Reference to the user who placed the order
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true, // User ID who placed the order
		ref: 'UserModel', // Reference to the User model to link the order with the user
	},
	// Information about the items in the order
	orderItems: [{
		name: {
			type: String,
			required: true, // Name of the product ordered
		},
		quantity: {
			type: Number,
			required: true, // Quantity of the product ordered
		},
		image: {
			type: String,
			required: true, // Image URL of the product ordered
		},
		price: {
			type: Number,
			required: true, // Price per unit of the product ordered
		},
		product: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true, // Product ID from the product collection
			ref: 'ProductModel', // Reference to the Product model to link the order item with the product
		},
	}],
	// Price details for the items in the order
	itemsPrice: {
		type: Number,
		required: true, // Total price of all items ordered
		default: 0.0, // Default value if not specified
	},
	// Tax price for the order
	taxPrice: {
		type: Number,
		required: true, // Total tax applied to the order
		default: 0.0, // Default value if not specified
	},
	// Shipping price for the order
	shippingPrice: {
		type: Number,
		required: true, // Shipping cost for the order
		default: 0.0, // Default value if not specified
	},
	// Total price for the order including items price, tax, and shipping
	totalPrice: {
		type: Number,
		required: true, // Grand total cost of the order
		default: 0.0, // Default value if not specified
	},
	// Timestamp when the order was paid
	paidAt: {
		type: Date, // Date and time when the payment was made
	},
	// Timestamp when the order was delivered
	deliveredAt: {
		type: Date, // Date and time when the order was delivered
	},
	// Status of the order
	orderStatus: {
		type: String,
		required: true, // Current status of the order (e.g., pending, shipped, delivered)
		default: 'Processing'
	},
	// Timestamp when the order was created
	createdAt: {
		type: Date,
		default: Date.now, // Default to the current date and time when the order is created
	},
})

// Create the order model from the schema
let orderModel = mongoose.model('Order', orderSchema)

// Export the order model for use in other parts of the application
module.exports = orderModel
