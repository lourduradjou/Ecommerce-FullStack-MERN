class APIFeatures {
	constructor(query, queryStr) {
		// Store the Mongoose query object
		this.query = query
		// Store the query string from the URL
		this.queryStr = queryStr
	}

	search() {
		// Check if the 'keyword' property exists in the query string
		let keyword = this.queryStr.keyword
			? {
					// Create a regex pattern to search for the keyword in the 'name' field
					name: {
						$regex: this.queryStr.keyword,
						$options: 'i', // Case-insensitive search
					},
			  }
			: {}

		// Apply the search filter to the query
		this.query.find({ ...keyword })
		// Return the instance of the class for method chaining
		return this
	}

	filter() {
		// Create a copy of the query string object
		const queryStrCopy = { ...this.queryStr }
		// Define the fields to be removed from the filter
		const removeFields = ['keyword', 'limit', 'page']
		// Remove the specified fields from the copy
		removeFields.forEach((field) => delete queryStrCopy[field])

		// Convert the filter values to regex for case-insensitive matching
		for (const key in queryStrCopy) {
			// Create a regex pattern for each filter field
			queryStrCopy[key] = { $regex: queryStrCopy[key], $options: 'i' }
		}

		// Apply the filters to the query
		this.query.find(queryStrCopy)
		// Return the instance of the class for method chaining
		return this
	}
}

// Export the APIFeatures class
module.exports = APIFeatures
