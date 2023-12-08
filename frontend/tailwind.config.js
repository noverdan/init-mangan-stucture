/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#de283b',
        'primary-200': '#ff6366',
        'primary-300': '#ffccc4',
        'accent-100': '#25b1bf',
        'accent-200': '#005461',
        'text-100': '#1a1a1a',
        'text-200': '#404040',
        'bg-100': '#ffffff',
        'bg-200': '#f5f5f5',
        'bg-300': '#cccccc',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

