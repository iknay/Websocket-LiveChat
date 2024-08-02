/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#E9E9E9",

        primary: "#007AFF",

        black: "#242426",

        textGray: {
          700: "#444446",
        },
      },
    },
  },
  plugins: [],
};
