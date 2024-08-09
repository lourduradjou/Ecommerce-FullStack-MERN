const express = require('express')
const {
	getProducts,
	newProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	createReview,
	getReviews,
	deleteReview,
} = require('../controllers/productController')
const {
	isAuthenticatedUser,
	authorizeRoles,
} = require('../middlewares/authenticate.Middleware')
const router = express.Router()

//routes to work with , example get and put request of the products

//get all products details route -> api/v1/products
router.route('/products').get( getProducts)

//get a single product details route -> api/v1/product/:id
router
	.route('/product/:id')
	.get(isAuthenticatedUser,getSingleProduct)
	.put(isAuthenticatedUser,authorizeRoles('admin'), updateProduct)
	.delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct) //three request for the same uri combined
//router.route('/product/:id').put(updateProduct) - can be like this also

//create a new product route -> api/v1/admin/product/:id
router
	.route('/admin/product/new')
	.post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)

//Route to handle review created by a user for a specific product  -> api/v1/review/create
router.route('/review/create').put(isAuthenticatedUser, createReview)

//Route to get reviews of a specific product -> api/v1/reviews?id={productId}
router.route('/reviews').get(isAuthenticatedUser, getReviews).delete(isAuthenticatedUser, deleteReview)
module.exports = router

// GET: Retrieve data from the server. Used to request and retrieve a resource.

// POST: Send data to the server to create a new resource. The data is included in the body of the request.

// PUT: Update an existing resource on the server. The entire resource is replaced with the data provided.

// PATCH: Partially update an existing resource. Only the changes specified in the request are applied.

// DELETE: Remove a resource from the server.
