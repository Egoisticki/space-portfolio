/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#02020f',
        'deep-space': '#050518',
        'nebula-dark': '#0a0a2e',
        cyan: '#00f5ff',
        'cyan-dim': '#00a8b5',
        violet: '#7b2fff',
        'violet-bright': '#a855f7',
        amber: '#ff9a3c',
        'star-white': '#e8f4ff',
        'text-primary': '#c8d8f0',
        'text-dim': '#5a7a9a',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.4), 0 0 60px rgba(0, 245, 255, 0.1)',
        'glow-violet': '0 0 20px rgba(123, 47, 255, 0.4), 0 0 60px rgba(123, 47, 255, 0.1)',
        'glow-amber': '0 0 20px rgba(255, 154, 60, 0.4), 0 0 60px rgba(255, 154, 60, 0.1)',
      },
      backgroundImage: {
        'card-bg': 'rgba(8, 12, 40, 0.7)',
      },
    },
  },
  plugins: [],
}
