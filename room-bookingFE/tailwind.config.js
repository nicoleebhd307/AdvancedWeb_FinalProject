/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#257bf4',
          dark: '#1a6bde',
          darker: '#155ccc',
          light: 'rgba(37,123,244,0.1)',
        },
      },
    },
  },
  plugins: [],
};
