/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pink-soft': '#F7D6E8',
        'pink-light': '#FBEAF3',
        'pink-btn': '#E8448A',
        'black-main': '#111111',
        'gray-bg': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-r': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'float-sm': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-r': 'float-r 4.5s ease-in-out infinite',
        'float-sm': 'float-sm 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
