import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Screenshot theme colors - Dark blue/navy with cyan accents
        'deep-navy': '#0A1628',
        'navy-dark': '#0F1B2D',
        'navy-medium': '#1A2332',
        'navy-light': '#1E2A3A',
        'cyan-bright': '#00D9FF',
        'cyan-glow': '#00F0FF',
        'cyan-soft': '#4DD4E8',
        'electric-cyan': '#64FFDA',
        'azure-start': '#3B82F6',
        'neon-glow': '#8B5CF6',
        'vibrant-pink': '#EC4899',
        'sunset-orange': '#F59E0B',
        'lime-green': '#84CC16',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00D9FF 0%, #3B82F6 50%, #8B5CF6 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #3B82F6 0%, #00D9FF 100%)',
      },
    },
  },
  plugins: [],
}
export default config
