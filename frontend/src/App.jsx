import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Product from './components/productComponents/ProductDetails'

const App = () => {
	return (
		<Router>
			<div>
				<HelmetProvider>
					<Navbar />
					<ToastContainer />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/product/:id' element={<Product />}/>
					</Routes>
					<Footer />
				</HelmetProvider>
			</div>
		</Router>
	)
}

export default App
