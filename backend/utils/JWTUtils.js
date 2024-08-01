// Function to send a JWT token and response to the client
const sendToken_And_Response = (user, statusCode, res) => {
	// Generate a JWT token for the user
	const token = user.getJwtToken()

	// Define cookie options
	const options = {
		// Set the cookie expiration time
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // Cookie expiration time in milliseconds
		),
		// Make the cookie inaccessible to client-side scripts
		httpOnly: true,
	}

	// Send the HTTP response with status code, set the token cookie, and send JSON data
	res.status(statusCode) // Set the HTTP status code of the response
		.cookie('token', token, options) // Set the token in the response cookies with defined options
		.json({
			success: true, // Indicate success in the response
			token, // Send the generated token in the response body
			user, // Send the user object in the response body
		})
}

// Export the function for use in other parts of the application
module.exports = sendToken_And_Response
