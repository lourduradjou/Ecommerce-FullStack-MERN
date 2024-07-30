const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const products = require('./routes/product.routes')
const connectDatabase = require('./config/connectDB')
const errorMiddleware = require('./middlewares/error.Middleware')

//getting the express object to work with its functions..
const app = express()

//basic importing stuffs and using express.json() to work with json formated files
app.use(express.json())

//configuring environment variables here and giving the path using path module
dotenv.config({ path: path.join(__dirname, 'config/config.env') })

//connecting mongo db database, function defined in ./config/database.js file
connectDatabase()

//first middleware to apply routing to api/v1
app.use('/api/v1/', products)

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
