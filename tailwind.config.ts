import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050B18',
        navy: '#071225',
        panel: '#0A1730',
        royal: '#295BFF',
        ice: '#F7F9FC',
        muted: '#A9B4C8'
      },
      boxShadow: {
        royal: '0 0 60px rgba(41, 91, 255, 0.18)'
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;
