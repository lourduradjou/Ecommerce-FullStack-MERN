/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				walmartBlue: {
					DEFAULT: '#0071dc',
				},
				walmartYellow: {
					DEFAULT: '#eab308',
				},
			},
		},
	},
	plugins: [],
}
