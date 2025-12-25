/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind where to look for class names
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  
  theme: {
    extend: {
      // Custom colors matching your current purple/pink gradient theme
      colors: {
        primary: {
          DEFAULT: '#667eea',
          dark: '#5568d3',
          light: '#8b9cf5',
        },
        secondary: {
          DEFAULT: '#764ba2',
          dark: '#5f3a82',
          light: '#9b6bc4',
        },
        accent: {
          pink: '#ec4899',
          blue: '#3b82f6',
        },
      },
      // Custom gradient for the background
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-slider': 'linear-gradient(to right, #3b82f6 0%, #ec4899 100%)',
      },
    },
  },
  
  plugins: [],
};
