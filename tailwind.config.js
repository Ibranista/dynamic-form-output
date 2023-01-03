/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.js",
    "./pages/**/*.js",
    "./components/*.js",
    "./components/**/*.js",
    "./pages/**/*.js",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/*{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
