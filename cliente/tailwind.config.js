/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // If using the src directory, add:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B1B80",
          50: "#F5F2FF",
          100: "#D4C6F3",
          200: "#BBA4EC",
          300: "#A182E5",
          400: "#8861DE",
          500: "#6F3FD6",
          600: "#5A29C3",
          700: "#4B22A2",
          800: "#3B1B80",
          900: "#261152",
          950: "#1B0C3B",
        },
        secondary: {
          DEFAULT: "#F9C55F",
          50: "#FEF7E9",
          100: "#FDF0D5",
          200: "#FCE2AE",
          300: "#FAD386",
          400: "#F9C55F",
          500: "#F7B129",
          600: "#DF9708",
          700: "#A97206",
          800: "#734E04",
          900: "#3D2902",
          950: "#221701",
        },
        background: "#FFFDFD",
      },
    },
  },
  plugins: [],
};
