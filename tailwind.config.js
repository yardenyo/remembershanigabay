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
        "build-state":
          "url('https://res.cloudinary.com/dweltcoxk/image/upload/v1702223978/build_uessvo.webp')",
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
