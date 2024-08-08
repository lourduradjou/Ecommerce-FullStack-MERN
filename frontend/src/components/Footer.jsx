import React from 'react'
import {
	FaDribbbleSquare,
	FaFacebookSquare,
	FaGithubSquare,
	FaInstagram,
	FaTwitterSquare,
} from 'react-icons/fa'

const Footer = () => (
	<div
		className='bg-walmartBlue w-full grid lg:grid-cols-3 gap-8 text-gray-300  mx-auto py-16 px-10 '
		id='footer'
	>
		<div className='max-w-[1240px]'>
			<h1 className='text-xl font-bold w-full text-black'>
				Walmart - <span className='text-walmartYellow'>InvenOptix</span>
			</h1>
			<p className='py-4 hover:text-walmartYellow duration-200'>
				Revolutionizing inventory management with AI-driven insights to
				optimize stock levels and reduce operational inefficiencies.
				Harness predictive analytics to stay ahead of demand and enhance
				supply chain performance.
			</p>
			<div className='flex md:w-[75%] my-6 justify-between'>
				<FaDribbbleSquare
					size={30}
					className='hover:text-walmartYellow duration-200'
				/>
				<FaFacebookSquare
					size={30}
					className='hover:text-walmartYellow duration-200'
				/>
				<FaGithubSquare
					size={30}
					className='hover:text-walmartYellow duration-200'
				/>
				<FaInstagram
					size={30}
					className='hover:text-walmartYellow duration-200'
				/>
				<FaTwitterSquare
					size={30}
					className='hover:text-walmartYellow duration-200'
				/>
			</div>
		</div>
		<div className='lg:col-span-2 flex justify-between font-medium text-sm'>
			<div className='flex flex-col items-center'>
				<p className='mb-4 text-black text-xl'>Solutions</p>
				<p className='mb-4 hover:text-walmartYellow duration-200'>
					Analytics
				</p>
				<p className='mb-4 hover:text-walmartYellow duration-200'>
					Marketing
				</p>
				<p className='mb-4 hover:text-walmartYellow duration-200'>
					Analysis
				</p>
				<p className='mb-4 hover:text-walmartYellow duration-200'>
					Insights
				</p>
			</div>
			<div className='flex flex-col items-center'>
				<p className='pb-4 text-black text-xl'>Support</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Pricing
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Documentation
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Guides
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					API Status
				</p>
			</div>
			<div className='flex flex-col items-center'>
				<p className='pb-4 text-black text-xl'>Solutions</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Analytics
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Marketing
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Analysis
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Insights
				</p>
			</div>
			<div className='flex flex-col items-center'>
				<p className='pb-4 text-black text-xl'>Company</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					About
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Blogs
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Careers
				</p>
				<p className='pb-4 hover:text-walmartYellow duration-200'>
					Privacy
				</p>
			</div>
		</div>
	</div>
)

export default Footer
