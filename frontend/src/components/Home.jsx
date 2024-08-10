import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './MetaData'
import { getProducts } from '../stateManagement/actions/productsActions'
import Loader from './layout/Loader'
import Products from './productComponents/Products'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
	const dispatch = useDispatch()
	const { products, loading, error } = useSelector(
		(state) => state.productsState
	)

	useEffect(() => {
		if (error) {
			return toast.error(error, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			})
		}
		dispatch(getProducts) //please don't pass getProducts like -> as a function getProducts() it won't work
	}, [dispatch, error])

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
