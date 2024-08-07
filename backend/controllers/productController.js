const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandlerClass') //ErrorHanlder class
const catchAsyncError = require('../middlewares/catchAsyncError.Middleware') //created to handle asynchronous related errors
const APIFeatures = require('../utils/apiFeatures')

//Fetching all Products details - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
	const resultsPerPage = 2 //used to get the number of results we wanna show
	//we send the data to the api features to use it functions
	const apiFeatures = new APIFeatures(Product.find(), req.query)
		.search()
		.filter()
		.paginate(resultsPerPage)

	const products = await apiFeatures.productDetails //get the apiFeatures query which was send back using await ..

	res.status(200).json({
		success: true,
		count: products.length,
		message: 'This route will show all the products in database',
		products,
	})
})

//Creating Product - /api/v1/products/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
	req.body.user = req.user.id
	const product = await Product.create(req.body)

	res.status(201).json({
		success: true,
		message: 'This route will create a new product in the database',
		product,
	})
})

//Get Single Product - /api/v1/products/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		//if the product is empty
		return next(new ErrorHandler('Product not found', 400))
	} else {
		res.status(200).json({
			success: true,
			product,
		})
	}
})

//Update Product - /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		//if the product is empty
		return next(
			new ErrorHandler(
				`Data is not found in the database for the given id : ${req.params.id}`,
				400
			)
		)
	}
	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true, //returns back the updated value
			runValidators: true, //runs the schema validations before updating with the incoming values
		}
	)

	res.status(200).json({
		success: true,
		updatedProduct,
	})
})

//Delete Product - used to delete a product via its id, api url - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.params.id)

	if (!product) {
		//if the product is empty
		return next(
			new ErrorHandler(
				`Data is not found in the database for the given id : ${req.params.id}`,
				400
			)
		)
	}

	await Product.findByIdAndDelete(req.params.id)

	res.status(200).json({
		success: true,
		message: 'Successful deleted the product',
	})
})

// Create Review - API endpoint: api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
	// Destructure the necessary data from the request body
	const { productId, rating, comment } = req.body

	// Create a new review object with user ID, rating (converted to float), and comment
	const review = {
		user: req.user.id,
		rating: parseFloat(rating), // Ensure rating is a number
		comment,
	}

	// Find the product by its ID
	const product = await Product.findById(productId)

	// If the product is not found, return a 404 response
	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found',
		})
	}

	// Check if the user has already reviewed this product
	const existingReviewIndex = product.reviews.findIndex(
		(r) => r.user?.toString() === req.user?.id?.toString()
	)

	if (existingReviewIndex !== -1) {
		// If an existing review is found, update the review's comment and rating
		product.reviews[existingReviewIndex].comment = comment
		product.reviews[existingReviewIndex].rating = rating
	} else {
		// If no existing review is found, add the new review to the product's reviews
		product.reviews.push(review)
	}

	// Update the number of reviews for the product
	product.numOfReviews = product.reviews.length

	// Calculate the total rating from all reviews
	const totalRating = product.reviews.reduce((acc, review) => {
		console.log(review.rating) // Debugging output
		return acc + (review.rating || 0) // Ensure each rating is treated as a number
	}, 0)

	console.log('totalRating: ', totalRating) // Debugging output

	// Calculate the average rating
	product.ratings =
		product.numOfReviews > 0 ? totalRating / product.numOfReviews : 0

	console.log(product.ratings) // Debugging output

	// Save the updated product document without validation
	await product.save({ validateBeforeSave: false })

	// Send a successful response indicating the review was added or changed
	res.status(200).json({
		success: true,
		message: 'Review was successfully added/changed',
	})
})

// * -----not related to the product ----------personal notes-------------
// 1xx: Informational
// - 100 Continue: Request received, continue to send the rest of the request.
// - 101 Switching Protocols: Switching to the protocol specified in the Upgrade header.

// 2xx: Success
// - 200 OK: Request succeeded; the resource is transmitted in the response.
// - 201 Created: Request succeeded; a new resource has been created.
// - 202 Accepted: Request accepted for processing but not completed.
// - 204 No Content: Request succeeded but no content to send back.

// 3xx: Redirection
// - 301 Moved Permanently: Resource has been permanently moved to a new URL.
// - 302 Found (Moved Temporarily): Resource temporarily available at a different URL.
// - 304 Not Modified: Resource has not been modified since the last request.

// 4xx: Client Error
// - 400 Bad Request: The request was invalid or cannot be processed.
// - 401 Unauthorized: Authentication is required or has failed.
// - 403 Forbidden: Server refuses to fulfill the request.
// - 404 Not Found: The requested resource could not be found.
// - 405 Method Not Allowed: The request method is not supported for the resource.

// 5xx: Server Error
// - 500 Internal Server Error: A generic error occurred on the server.
// - 502 Bad Gateway: The server received an invalid response from an upstream server.
// - 503 Service Unavailable: The server is currently unavailable, often due to overload or maintenance.
// - 504 Gateway Timeout: The server did not receive a timely response from an upstream server.
