const express = require('express')
const {
	getProducts,
	newProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController')
const router = express.Router()

//routes to work with , example get and put request of the products
router.route('/products').get(getProducts)
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct).put(updateProduct) //two request for the same uri combined
router.route('/product/:id').delete(deleteProduct)
//router.route('/product/:id').put(updateProduct) - can be like this also

module.exports = router

// GET: Retrieve data from the server. Used to request and retrieve a resource.

// POST: Send data to the server to create a new resource. The data is included in the body of the request.

// PUT: Update an existing resource on the server. The entire resource is replaced with the data provided.

// PATCH: Partially update an existing resource. Only the changes specified in the request are applied.

// DELETE: Remove a resource from the server.
