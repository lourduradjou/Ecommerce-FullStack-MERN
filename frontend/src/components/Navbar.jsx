import React from 'react'

const Navbar = () => {
	return (
		<div>
			<nav class='bg-walmartBlue px-4 flex md:flex-row items-center justify-between select-none'>
				<div class='flex items-center w-full'>
					<img
						class='w-16 rounded-md'
						src='./images/walmartLogo.png'
					/>
					<div class='flex-1 mx-4'>
						<div class='relative w-1/2 md:w-3/4 mx-auto'>
							<input
								type='text'
								class='h-10 p-4 w-full border border-gray-300 outline-none rounded-full'
								placeholder='Enter Product Name ...'
							/>
							<button
								id='search_btn'
								class='absolute right-0 top-0 h-full bg-yellow-500 px-6 py-2 text-gray-900 rounded-full'
							>
								<i class='fa fa-search' aria-hidden='true'></i>
							</button>
						</div>
					</div>
				</div>

				<div class=' items-center justify-around mx-4 hidden md:flex text-center'>
					<button class='bg-yellow-500 px-6 py-2 rounded text-gray-900'>
						Login
					</button>
					<span class='ml-4 text-white px-6 py-2 rounded bg-blue-900'>
						Cart
						<span class='ml-2 bg-yellow-500 px-2 py-1 rounded text-black font-bold'>
							2
						</span>
					</span>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
