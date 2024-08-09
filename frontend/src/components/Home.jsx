import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './MetaData'
import { getProducts } from '../stateManagement/actions/productsActions'

const Home = () => {
	const dispatch = useDispatch()
	const { products, loading } = useSelector((state) => state.productsState)

	useEffect(() => {
		dispatch(getProducts)
	}, [dispatch])

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
		<main>
			<MetaData title='Best Products For You' />
			<h1
				id='products_heading'
				className='text-3xl font-bold text-center my-8'
			>
				Latest Products
			</h1>

			<section id='products' className='container mx-auto mt-5'>
				<div className='flex flex-wrap -mx-3'>
					{products && products.map((product) => (
						<div className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'>
							<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
								<img
									className='w-full h-48 object-contain'
									src={product.images[0].image}
									alt='Product 1'
								/>
								<div className='flex flex-col p-4'>
									<h5 className='text-lg font-bold mb-2'>
										<a href='/' className='hover:underline'>
											{product.name}
										</a>
									</h5>
									<p>{product.description}</p>
									<div className='mt-auto flex items-center'>
										<div className='flex items-center'>
											{renderStars(product.ratings)}
											<span
												className='ml-2'
												id='no_of_reviews'
											>
												({product.numOfReviews} Reviews)
											</span>
										</div>
									</div>
									<p className='text-lg font-semibold mt-2'>
										{product.price}
									</p>
									<a
										href='/'
										id='view_btn'
										className='btn btn-blue mt-3'
									>
										View Details
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}

export default Home
