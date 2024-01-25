/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-section":
          "url('https://res.cloudinary.com/dweltcoxk/image/upload/v1702896957/%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_kw2vxi.png')",
      },
      fontFamily: {
        body: ["Assistant", "sans-serif"],
      },
      colors: {
        container: "#f3f5f7",
      },
    },
  },
  plugins: [],
};
