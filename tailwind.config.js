module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			gridTemplateColumns: {
				62: 'repeat(62, minmax(0, 1fr))',
				50: 'repeat(50, minmax(0, 1fr))',
				38: 'repeat(38, minmax(0, 1fr))',
				26: 'repeat(26, minmax(0, 1fr))',
				18: 'repeat(18, minmax(0, 1fr))',
			},
		},
	},
	plugins: [],
};
