// dataSeeder() -> is used to delete all the data which are already there in the database
// and freshly insert all the data from the json data file

const allProductsData = require('../data/productData.json')
const Product = require('../models/productModel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/connectDB')
const path = require('path')

//configuring environment variables here and giving the path using path module
console.log(__dirname)
dotenv.config({ path: path.join(__dirname, '..', 'config/config.env') })

//connecting mongo db database, function defined in ./config/database.js file
connectDatabase()

const seedProducts = async () => {
	try {
		await Product.deleteMany() //delete the data which is already there in the db
		console.log('Products deleted')

		await Product.insertMany(allProductsData) //inserting all the products data we have freshly
		console.log('All products added')
	} catch (err) {
		console.log(`Errorz ${err.message}`)
	}

	process.exit()
}

seedProducts()
