const express = require('express')
const {
	getProducts,
	newProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController')
const {
	isAuthenticatedUser,
} = require('../middlewares/authenticate.Middleware')
const router = express.Router()

//routes to work with , example get and put request of the products

//get all products details route
router.route('/products').get(isAuthenticatedUser, getProducts)
//create a new product route
router.route('/product/new').post(isAuthenticatedUser,newProduct)
//get a single product details route
router
	.route('/product/:id')
	.get(getSingleProduct)
	.put(updateProduct)
	.delete(deleteProduct) //three request for the same uri combined
//router.route('/product/:id').put(updateProduct) - can be like this also

//delete a product details route
// router.route('/product/:id').delete(deleteProduct)

module.exports = router

// GET: Retrieve data from the server. Used to request and retrieve a resource.

// POST: Send data to the server to create a new resource. The data is included in the body of the request.

// PUT: Update an existing resource on the server. The entire resource is replaced with the data provided.

// PATCH: Partially update an existing resource. Only the changes specified in the request are applied.

// DELETE: Remove a resource from the server.
