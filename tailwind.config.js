/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wine-bg': '#ffffff',
        'wine-text': '#1a1a1a',
        'wine-muted': '#777',
        'wine-accent': '#e0dbd4',
        'wine-hero': '#2c2c2c',
        'wine-stone': '#e8e4df',
        'wine-announcement': '#f5f5f5',
        'wine-border': '#e5e5e5',
        'wine-body': '#555',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
