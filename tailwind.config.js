/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#030816",
          900: "#071228",
          800: "#0c1d3d",
          700: "#132c5b",
        },
        gold: {
          300: "#fbe8a6",
          400: "#f6d56d",
          500: "#d4af37",
          600: "#aa8822",
        },
      },
    },
  },
  plugins: [],
};