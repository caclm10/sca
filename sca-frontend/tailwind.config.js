module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'toast-enter': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'toast-leave': {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
      },
      animation: {
        'toast-enter': 'toast-enter 0.3s ease-in-out',
        'toast-leave': 'toast-leave 1.1s ease-in-out',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}