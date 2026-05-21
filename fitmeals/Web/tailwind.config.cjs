module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        geist: ["var(--font-geist)"],  
      },
    },
  },
  plugins: [require("daisyui")],
};