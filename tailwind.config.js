/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#404040',
        mainBg2: '#606060',
        redEasy: '#eb5656e6',
        boxBlack: '#202020',
        mainBeige: '#faebd7'
      },
      screens: {
        xs: {max: '470px'}
      }
    },
  },
  plugins: [],
}
