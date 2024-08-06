const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const productRoutes = require('./routes/product.Routes')
const connectDatabase = require('./config/connectDB')
const errorMiddleware = require('./middlewares/error.Middleware')
const authRoutes = require('./routes/auth.Routes')
const authAdminRoutes = require('./routes/authAdmin.Routes')
const orderRoutes = require('./routes/order.Routes')
const cookieParser = require('cookie-parser')
//getting the express object to work with its functions..
const app = express()

//basic importing stuffs and using express.json() to work with json formated files
app.use(express.json())
//using the cookie parser package to work with cookies
app.use(cookieParser())

//configuring environment variables here and giving the path using path module
dotenv.config({ path: path.join(__dirname, 'config/config.env') })

//connecting mongo db database, function defined in ./config/database.js file
connectDatabase()

// middleware to apply routing to api/v1 for product related requests
app.use('/api/v1/', productRoutes)

// middleware to apply routing to api/v1 for user authenticatin related requests
app.use('/api/v1/', authRoutes)

// middleware to apply routing related to admin controlles
app.use('/api/v1/', authAdminRoutes)

// middleware to apply routing related to order controllers
app.use('/api/v1/', orderRoutes)
//middleware to handle Validation and Cast Error seperately for development and seperately for the production(to the user)
app.use(errorMiddleware)

//port to listen and work...
const server = app.listen(process.env.PORT, () => {
	console.log(
		`Server is listening on port: ${process.env.PORT} and in ${process.env.NODE_ENV}`
	)
})

/*
	This event handler listen's for 'unhandledRejection' 
	which occur when a Promise is rejected and not handled with a 
	catch() block. 
	process.exit(1) -> status code 1 indicates an error occured so closed
	1 -> abnormal exit
	0 -> normal exit
*/
process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err.message}`)
	console.log('Shutting down the server due to unhandled rejection error')
	server.close(() => {
		process.exit(1)
	})
})

/*
	This event handler listen's for 'unhandledException' 
	which handles the error not caught by try ... catch block.. 
	process.exit(1) -> status code 1 indicates an error occured so closed
	1 -> abnormal exit
	0 -> normal exit
*/
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.message}`)
	console.log('Shutting down the server due to uncaught exception error')
	server.close(() => {
		process.exit(1)
	})
})
