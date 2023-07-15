/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        myWhite: "#fffffe",
        myGray: "#eff0f3",
        myOrange: "#ff8e3c",
        myPink: "#d9376e",
        myPinkish: "#f0afc4",
        myBlack: "#0d0d0d",
      },
    },
  },
  plugins: [],
};
