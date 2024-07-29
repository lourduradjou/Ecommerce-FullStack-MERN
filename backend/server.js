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

app.use(errorMiddleware)

//port to listen and work...
app.listen(process.env.PORT, () => {
	console.log(
		`Server is listening on port: ${process.env.PORT} and in ${process.env.NODE_ENV}`
	)
})
