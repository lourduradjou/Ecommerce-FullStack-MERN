import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<div className='bg-slate-100 h-screen w-full'>
				<HelmetProvider>
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
					<Footer />
				</HelmetProvider>
			</div>
		</Router>
	)
}

export default App
