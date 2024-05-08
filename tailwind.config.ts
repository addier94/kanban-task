import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs-custom": "375px",
        "sm-custom": "768px",
        "md-custom": "1440px",
      },

      colors: {
        primary: {
          black: "#000112",
          "very-dark-grey": "#20212C",
          "dark-grey": "#2B2C37",
          "lines-dark": "#3E3F4E",
          "medium-grey": "#828FA3",
          "lines-light": "#E4EBFA",
          "light-grey-light": "#F4F7FD",
          white: "#FFFFFF",
          "main-purple": "#635FC7",
          "main-purple-hover": "#A8A4FF",
          red: "#EA5555",
          "red-hover": "#FF9898",
          random1: "#49C4E5",
        },
      },

      fontFamily: {
        "plus-jakarta-sans-normal": ["Plus Jakarta Sans Normal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
