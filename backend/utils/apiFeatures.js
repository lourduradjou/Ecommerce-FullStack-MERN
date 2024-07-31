class APIFeatures {
	constructor(productDetails, queryStr) {
		// Store the Mongoose query object
		this.productDetails = productDetails
		// Store the query string from the URL
		this.queryStr = queryStr
	}

	// api/v1/products?keyword='?'
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
		this.productDetails.find({ ...keyword })
		// Return the instance of the class for method chaining
		return this
	}

	// api/v1/products?categories='?' or api/v1/products?price[lt]=?
	filter() {
		// Create a copy of the query string object
		const queryStrCopy = { ...this.queryStr }
		// Define the fields to be removed from the filter
		const removeFields = ['keyword', 'limit', 'page']
		// Remove the specified fields from the copy
		removeFields.forEach((field) => delete queryStrCopy[field])

		//after removing the unnecessary fields add the $ sign to make filters among prices
		let modifiedQueryStr = JSON.stringify(queryStrCopy)
		modifiedQueryStr = modifiedQueryStr.replace(
			/\b(gt|gte|lt|lte)/g,
			(match) => `$${match}`
		)
		//console.log(queryStr)

		// Apply the filters to the query
		this.productDetails.find(JSON.parse(modifiedQueryStr))
		// Return the instance of the class for method chaining
		return this
	}

	paginate(resultsPerPage) {
		// Convert the 'page' parameter from the query string to a number.
		// If 'page' is not provided or is invalid, default to 1.
		//console.log(typeof this.queryStr.page) -> gives string convert to number using Number()
		const currentPage = Number(this.queryStr.page) || 1

		// Calculate the number of documents to skip based on the current page.
		// 'skip' determines how many results to skip before starting to collect the results for the current page.
		const skip = resultsPerPage * (currentPage - 1)

		// Apply the limit and skip to the productDetails query.
		// 'limit' restricts the number of results returned to 'resultsPerPage'.
		// 'skip' skips the specified number of results based on the current page.
		this.productDetails.limit(resultsPerPage).skip(skip)

		// Return the instance of the class for method chaining.
		return this
	}
}

// Export the APIFeatures class
module.exports = APIFeatures
