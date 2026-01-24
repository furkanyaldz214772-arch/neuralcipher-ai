/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NeuralCipher Brand Colors
        'deep-navy': '#0A192F',
        'electric-cyan': '#64FFDA',
        'midnight-blue': '#1a2a4a',
        'neon-glow': '#00D9FF',
        'azure-start': '#3C51F5',
        'vibrant-pink': '#FF006E',
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'azure-gradient': 'linear-gradient(135deg, #3C51F5 0%, #64FFDA 100%)',
        'vibrant-gradient': 'linear-gradient(45deg, #FF006E 0%, #64FFDA 100%)',
        'neon-gradient': 'linear-gradient(90deg, #0A192F 0%, #00D9FF 100%)',
        'premium-gradient': 'linear-gradient(180deg, #1a2a4a 0%, #64FFDA 100%)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(100, 255, 218, 0.5)',
        'neon-lg': '0 0 20px rgba(100, 255, 218, 0.6)',
        'glow': '0 0 30px rgba(0, 217, 255, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(100, 255, 218, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
