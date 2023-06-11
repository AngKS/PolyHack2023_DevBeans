/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'background': '#F1FCFE',
        'website-section': '#EEF0F2',
        'website-section-head': '#6B7280',
        'progress-bar': '#E3E3E3',
        'planColor': '#74FC71',
      },
      width: {
        'ext': '350px',
      },
      height: {
        'ext': '450px',
      }
    },
  },
  plugins: [],
}

