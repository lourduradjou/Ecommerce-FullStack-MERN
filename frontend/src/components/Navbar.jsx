import React from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuDemo } from './ui/dropDownDemo'

const Navbar = () => {
	return (
		<div>
			<nav className='bg-walmartBlue px-4 flex md:flex-row items-center justify-between select-none'>
				<div className='flex items-center w-full'>
					<img
						className='w-16 rounded-md'
						src='./images/walmartLogo.png'
						alt='Walmart Logo'
					/>
					<p className='text-medium text-xl p-2'>
						Walmart -{' '}
						<span className='text-yellow-500'>InvenOptix</span>
					</p>
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
				<DropdownMenuDemo />
				<div className='items-center justify-around mx-4 hidden md:flex text-center'>
					<Button>
						<Mail className='mr-2 h-4 w-4' /> Login with Email
					</Button>
					<span className='ml-4 text-black font-medium px-6 py-2 rounded bg-amber-500'>
						Cart
						<span className='ml-2  py-1 rounded text-black font-medium'>
							2
						</span>
					</span>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
