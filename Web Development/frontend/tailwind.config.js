/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Black: "#1E2932",
        primarybg: "#1e28320d",
      },
      fontFamily: {
        "primary-txt": ["Roboto", "san-serif"],
      },
    },
  },
  plugins: [],
};
