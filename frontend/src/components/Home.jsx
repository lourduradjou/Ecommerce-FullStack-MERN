import React from 'react'
import MetaData from './MetaData'

const Home = () => {
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
					<div className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'>
						<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
							<img
								className='w-full h-48 object-contain'
								src='./products/1.jpg'
								alt='Product 1'
							/>
							<div className='flex flex-col p-4'>
								<h5 className='text-lg font-bold mb-2'>
									<a href='#' className='hover:underline'>
										OPPO F21s Pro 5G (Dawnlight Gold, 8GB
										RAM, 128 Storage) with No Cost
										EMI/Additional Exchange Offers
									</a>
								</h5>
								<div className='mt-auto flex items-center'>
									<div className='flex items-center'>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star-half-o text-yellow-500'></i>
										<i className='fa fa-star-o text-yellow-500'></i>
										<span
											className='ml-2'
											id='no_of_reviews'
										>
											(5 Reviews)
										</span>
									</div>
								</div>
								<p className='text-lg font-semibold mt-2'>
									$245.67
								</p>
								<a
									href='#'
									id='view_btn'
									className='btn btn-blue mt-3'
								>
									View Details
								</a>
							</div>
						</div>
					</div>

					<div className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'>
						<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
							<img
								className='w-full h-48 object-contain'
								src='./products/2.jpg'
								alt='Product 2'
							/>
							<div className='flex flex-col p-4'>
								<h5 className='text-lg font-bold mb-2'>
									<a href='#' className='hover:underline'>
										WRISTIO HD, Bluetooth Calling Smart
										Watch, 15 days battery life, Water
										Resistant
									</a>
								</h5>
								<div className='mt-auto flex items-center'>
									<div className='flex items-center'>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star-half-o text-yellow-500'></i>
										<i className='fa fa-star-o text-yellow-500'></i>
										<span
											className='ml-2'
											id='no_of_reviews'
										>
											(5 Reviews)
										</span>
									</div>
								</div>
								<p className='text-lg font-semibold mt-2'>
									$150.32
								</p>
								<a
									href='#'
									id='view_btn'
									className='btn btn-blue mt-3'
								>
									View Details
								</a>
							</div>
						</div>
					</div>

					<div className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'>
						<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
							<img
								className='w-full h-48 object-contain'
								src='./products/3.jpg'
								alt='Product 3'
							/>
							<div className='flex flex-col p-4'>
								<h5 className='text-lg font-bold mb-2'>
									<a href='#' className='hover:underline'>
										Dell Inspiron 3511 Laptop, Intel
										i3-1115G4, 8GB, 512GB
									</a>
								</h5>
								<div className='mt-auto flex items-center'>
									<div className='flex items-center'>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star-half-o text-yellow-500'></i>
										<i className='fa fa-star-o text-yellow-500'></i>
										<span
											className='ml-2'
											id='no_of_reviews'
										>
											(5 Reviews)
										</span>
									</div>
								</div>
								<p className='text-lg font-semibold mt-2'>
									$440.57
								</p>
								<a
									href='#'
									id='view_btn'
									className='btn btn-blue mt-3'
								>
									View Details
								</a>
							</div>
						</div>
					</div>

					<div className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'>
						<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
							<img
								className='w-full h-48 object-contain'
								src='./products/4.jpg'
								alt='Product 4'
							/>
							<div className='flex flex-col p-4'>
								<h5 className='text-lg font-bold mb-2'>
									<a href='#' className='hover:underline'>
										PTron Newly Launched Tangent Sports,
										60Hrs Playtime
									</a>
								</h5>
								<div className='mt-auto flex items-center'>
									<div className='flex items-center'>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star-half-o text-yellow-500'></i>
										<i className='fa fa-star-o text-yellow-500'></i>
										<span
											className='ml-2'
											id='no_of_reviews'
										>
											(5 Reviews)
										</span>
									</div>
								</div>
								<p className='text-lg font-semibold mt-2'>
									$15.46
								</p>
								<a
									href='#'
									id='view_btn'
									className='btn btn-blue mt-3'
								>
									View Details
								</a>
							</div>
						</div>
					</div>

					<div className='w-full sm:w-1/2 lg:w-1/4 px-3 my-3'>
						<div className='bg-white shadow-md rounded-lg overflow-hidden p-3'>
							<img
								className='w-full h-48 object-contain'
								src='./products/5.jpg'
								alt='Product 5'
							/>
							<div className='flex flex-col p-4'>
								<h5 className='text-lg font-bold mb-2'>
									<a href='#' className='hover:underline'>
										Campus Men's Maxico Running Shoes
									</a>
								</h5>
								<div className='mt-auto flex items-center'>
									<div className='flex items-center'>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star text-yellow-500'></i>
										<i className='fa fa-star-half-o text-yellow-500'></i>
										<i className='fa fa-star-o text-yellow-500'></i>
										<span
											className='ml-2'
											id='no_of_reviews'
										>
											(5 Reviews)
										</span>
									</div>
								</div>
								<p className='text-lg font-semibold mt-2'>
									$10.12
								</p>
								<a
									href='#'
									id='view_btn'
									className='btn btn-blue mt-3'
								>
									View Details
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Home
