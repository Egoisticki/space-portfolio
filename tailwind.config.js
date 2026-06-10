/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#03030a',
        'deep-space': '#050510',
        cyan: '#22d3ee',
        'cyan-dim': '#0891b2',
        violet: '#8b5cf6',
        'violet-bright': '#a78bfa',
        blue: '#2563eb',
        amber: '#f59e0b',
        'star-white': '#f8fafc',
        'text-primary': '#e5edf8',
        'text-dim': '#94a3b8',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.32)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
