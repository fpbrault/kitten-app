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
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            {
                kittens: {
                    primary: '#f9c5b4',
                    'primary-focus': '#f5a489',
                    'primary-content': '#f7f7f7',
                    secondary: '#6eb993',
                    'secondary-focus': '#47946c',
                    'secondary-content': '#f7f7f7',
                    accent: '#9fa3e9',
                    'accent-focus': '#6e73de',
                    'accent-content': '#f7f7f7',
                    neutral: '#3d4451',
                    'neutral-focus': '#2a2e37',
                    'neutral-content': '#f7f7f7',
                    'base-100': '#ffffff',
                    'base-200': '#f9fafb',
                    'base-300': '#d1d5db',
                    'base-content': '#1f2937',
                    info: '#2094f3',
                    success: '#009485',
                    warning: '#ff9900',
                    error: '#ff5724'
                }
            }
        ]
    }
};
