import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './MetaData'
import { getProducts } from '../stateManagement/actions/productsActions'
import Loader from './layout/Loader'
import Products from './Products'

const Home = () => {
	const dispatch = useDispatch()
	const { products, loading } = useSelector((state) => state.productsState)

	useEffect(() => {
		dispatch(getProducts) //please don't pass getProducts like -> as a function getProducts() it won't work
	}, [dispatch])


	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title='Best Products For You' />
					<h1
						id='products_heading'
						className='text-3xl font-bold text-center my-8'
					>
						Latest Products
					</h1>

					<section
						id='products'
						className='container mx-auto mt-5 bg-slate-100'
					>
						<Products products={products} />
					</section>
				</Fragment>
			)}
		</Fragment>
	)
}

export default Home
