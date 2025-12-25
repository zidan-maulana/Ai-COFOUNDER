/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna dari desain Figma Karo Agent
        primary: {
          DEFAULT: '#8B5CF6', // Purple utama
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        dark: {
          DEFAULT: '#0A0A0A', // Background utama
          card: '#1A1A1A', // Background card
          border: '#2A2A2A', // Border color
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-purple-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
}