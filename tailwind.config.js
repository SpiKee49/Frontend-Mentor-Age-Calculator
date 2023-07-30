/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        highlight:
          'hsl(var(--color-highlight) / <alpha-value>)',
        'light-red':
          'hsl(var(--color-light-red) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
