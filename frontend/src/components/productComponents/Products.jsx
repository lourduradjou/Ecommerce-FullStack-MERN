import React from 'react'
import { Link } from 'react-router-dom'

const Products = ({ products }) => {
	const renderStars = (rating) => {
		const fullStars = Math.floor(rating)
		const halfStar = rating % 1 !== 0
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

		const stars = []

		for (let i = 0; i < fullStars; i++) {
			stars.push(<i key={i} className='fa fa-star text-yellow-500'></i>)
		}

		if (halfStar) {
			stars.push(
				<i
					key={fullStars}
					className='fa fa-star-half-o text-yellow-500'
				></i>
			)
		}

		for (let i = 0; i < emptyStars; i++) {
			stars.push(
				<i
					key={fullStars + 1 + i}
					className='fa fa-star-o text-yellow-500'
				></i>
			)
		}

		return stars
	}

	return (
		<div className='flex flex-wrap -mx-3'>
			{products &&
				products.map((product) => (
					<div
						className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'
						key={product._id}
					>
						<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
							<img
								className='w-full h-48 object-contain'
								src={product.images[0].image}
								alt={product.name}
							/>
							<div className='flex flex-col p-4'>
								<h5 className='text-lg font-bold mb-2'>
									<Link
										className='hover:underline'
										to={`/product/${product._id}`}
									>
										{product.name}
									</Link>
								</h5>
								<p>{product.description}</p>
								<div className='mt-auto flex items-center'>
									<div className='flex items-center'>
										{renderStars(product.ratings)}
										<span
											className='ml-2'
										>
											({product.numOfReviews} Reviews)
										</span>
									</div>
								</div>
								<p className='text-lg font-semibold mt-2'>
									${product.price}
								</p>

								<Link
									className='hover:underline'
									to={`/product/${product._id}`}
								>
									View Details
								</Link>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default Products
