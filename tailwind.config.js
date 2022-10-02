/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      serif: ['serif'],
      cursive: ['Bad Script', 'cursive'],
      sans: ['sans-serif'],
    },
    fontSize: {
      h1: '4.2rem',
      h2: '3.6rem',
      h3: '2.8rem',
      h4: '2.1rem',
      h5: '1.8rem',
      base: '1.8rem',
      inherit: 'inherit',
    },
  },
  plugins: [],
};
