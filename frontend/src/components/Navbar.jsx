import React from 'react'

const Navbar = () => {
	return (
		<div>
			<nav className='bg-walmartBlue px-4 flex md:flex-row items-center justify-between select-none'>
				<div className='flex items-center w-full'>
					<img
						className='w-16 rounded-md'
						src='/images/walmartLogo.png'
						alt='Walmart Logo'
					/>

					<h1 className='text-xl font-bold text-black'>
						Walmart -{' '}
						<span className='text-walmartYellow'>InvenOptix</span>
					</h1>
					<div className='flex-1 mx-4'>
						<div className='relative w-1/2 md:w-3/4 mx-auto'>
							<input
								type='text'
								className='h-10 p-4 w-full border border-gray-300 outline-none rounded-full'
								placeholder='Enter Product Name ...'
							/>
							<button
								id='search_btn'
								className='absolute right-0 top-0 h-full bg-yellow-500 px-6 py-2 text-gray-900 rounded-full'
							>
								<i
									className='fa fa-search'
									aria-hidden='true'
								></i>
							</button>
						</div>
					</div>
				</div>

				<div className='items-center justify-around mx-4 hidden md:flex text-center'>
					{/* Login Button */}
					<span className='ml-4 text-black font-medium px-6 py-2 rounded bg-walmartYellow'>
						Login
					</span>

					{/* Cart Element */}
					<span className='ml-4 text-black font-medium px-6 py-2 rounded bg-walmartYellow'>
						Cart
						<span className='ml-2 py-1 rounded text-black font-medium'>
							2
						</span>
					</span>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
