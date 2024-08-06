const mongoose = require('mongoose')

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
	//Product created by which user , ID of the user
	user: {
		type: mongoose.Schema.Types.ObjectId
	},
	// Name of the product
	name: {
		type: String,
		required: [true, 'Please enter product name'], // Ensure name is provided
		trim: true, // Remove leading and trailing spaces
		maxLength: [100, 'Product name cannot exceed 100 characters'], // Maximum length constraint
	},
	// Price of the product
	price: {
		type: Number,
		required: true, // Price is mandatory
		default: 0.0, // Default price if not provided
	},
	// Description of the product
	description: {
		type: String,
		required: [true, 'Please enter product description'], // Ensure description is provided
	},
	// Ratings of the product
	ratings: {
		type: String,
		default: 0, // Default rating value if not provided
	},
	// Array of images associated with the product
	images: [
		{
			image: {
				type: String,
				required: true, // Ensure each image URL is provided
			},
		},
	],
	// Category to which the product belongs
	categories: {
		type: String,
		required: [true, 'Please enter product category'], // Ensure category is provided
		enum: {
			values: [
				'Electronics',
				'Mobile Phones',
				'Laptops',
				'Accessories',
				'HeadPhones',
				'Food',
				'Books',
				'Clothes/Shoes',
				'Beauty/Health',
				'Sports',
				'Outdoor',
				'Home',
			],
			message: 'Please select correct category', // Restrict to specified categories
		},
	},
	// Seller information
	seller: {
		type: String,
		require: [true, 'Please enter product seller'], // Ensure seller is provided
	},
	// Stock quantity of the product
	stock: {
		type: Number,
		required: [true, 'Please enter product stock'], // Ensure stock is provided
		maxLength: [20, 'Product stock cannot exceed 20'], // Maximum length constraint (note: maxLength is not applicable for Number, use min and max instead)
	},
	// Number of reviews for the product
	numOfReviews: {
		type: Number,
		default: 0, // Default number of reviews if not provided
	},
	// Array of reviews for the product
	reviews: [
		{
			name: {
				type: String,
				required: true, // Ensure reviewer's name is provided
			},
			rating: {
				type: String,
				required: true, // Ensure rating is provided
			},
            comment: {
                type: String,
                required: true // Ensure review comment is provided
            }
		},
	],
    // Date when the product was created
    createdAt: {
        type: Date,
        default: Date.now // Default creation date as the current date
    }
})

// Create the Product model using the schema
let productModel = mongoose.model('Product', productSchema)

// Export the Product model
module.exports = productModel
