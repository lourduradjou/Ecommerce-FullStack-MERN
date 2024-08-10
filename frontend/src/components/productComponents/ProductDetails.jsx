import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../stateManagement/actions/productAction'
import Loader from '../layout/Loader'
import Ratings from '../layout/Ratings'

const Product = () => {
	const { product, loading } = useSelector((state) => state.productState)
	const dispatch = useDispatch()
	const { id } = useParams()
	useEffect(() => {
		dispatch(getProduct(id))
	}, [dispatch, id])

	const [rating, setRating] = useState(0)

	const handleRatingChange = (newRating) => {
		setRating(newRating)
		console.log('New Rating:', newRating)
	}

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
		<>
			{loading ? (
				<Loader />
			) : (
				product && (
					<div className='container mx-auto px-4 py-16'>
						<div className='flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8'>
							<div className='lg:w-1/2 flex justify-center lg:justify-start select-none'>
								<img
									src={
										product.images
											? product.images[0].image
											: ''
									}
									alt='Product'
									className='w-full h-auto max-w-md rounded-lg shadow-lg'
								/>
							</div>

							<div className='lg:w-1/2 space-y-4'>
								<h3 className='text-3xl font-semibold'>
									{product.name}
								</h3>
								<p className='text-gray-500 text-sm'>
									Category: {product.categories}
								</p>

								<div className='flex items-center'>
									<div className=''>
										{renderStars(product.ratings)}
									</div>
									<span className='text-gray-500 text-sm pl-2'>
										({product.numOfReviews} Reviews)
									</span>
								</div>

								<hr className='my-4' />

								<p className='text-3xl font-bold'>
									${product.price}
								</p>
								<div className='flex items-center space-x-4'>
									<button className='bg-red-500 text-white px-4 py-2 rounded'>
										-
									</button>
									<input
										type='number'
										className='form-input w-16 text-center border rounded'
										value='1'
										readOnly
									/>
									<button className='bg-blue-500 text-white px-4 py-2 rounded'>
										+
									</button>
								</div>
								<button className='bg-orange-500 text-white px-4 py-2 rounded mt-4'>
									Add to Cart
								</button>

								<hr className='my-4' />

								<p>
									Status:{' '}
									<span
										className={
											product.stock > 0
												? 'text-green-600'
												: 'text-red-600'
										}
									>
										{product.stock > 0
											? 'In Stock'
											: 'Out of stock'}
									</span>
								</p>

								<hr className='my-4' />

								<h4 className='text-lg font-semibold mt-2'>
									Description:
								</h4>
								<p className='text-sm'>{product.description}</p>

								<hr className='my-4' />

								<p className='text-gray-500 text-sm mb-3'>
									Sold by: <strong>{product.seller}</strong>
								</p>

								<button
									className='bg-orange-500 text-white px-4 py-2 rounded'
									data-toggle='modal'
									data-target='#ratingModal'
								>
									Submit Your Review
								</button>

								<div
									className='modal fade'
									id='ratingModal'
									tabIndex='-1'
									role='dialog'
									aria-labelledby='ratingModalLabel'
									aria-hidden='true'
								>
									<div
										className='modal-dialog'
										role='document'
									>
										<div className='modal-content'>
											<div className='modal-header'>
												<h5
													className='modal-title'
													id='ratingModalLabel'
												>
													Submit Review
												</h5>
											</div>
											<div className='space-y-2'>
												<Ratings
													value={rating}
													onChange={
														handleRatingChange
													}
												/>
												<textarea
													name='review'
													className='form-textarea w-full border rounded p-2'
													rows='4'
												></textarea>
												<div className='flex w-full justify-center'>
													<button className='bg-orange-500 text-white px-4 py-2 rounded mt-3 w-full'>
														Submit
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</>
	)
}

export default Product
