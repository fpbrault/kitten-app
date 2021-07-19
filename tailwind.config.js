module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                '75vh': '75vh',
                '95vh': '95vh',
                '5vh': '5vh',
                '20vh': '20vh'
            },
            spacing: {
                '5vh': '5vh'
            },
            colors: {
                'cadet-blue': '#58A4B0',
                charcoal: '#373F51',
                'pastel-pink': '#DAA49A',
                'light-steel-blue': '#A9BCD0',
                gainsboro: '#D8DBE2'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
