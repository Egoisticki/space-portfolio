import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Pre-bundle heavy deps to avoid waterfall requests
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'gsap',
      'lenis',
    ],
  },

  build: {
    // Target modern browsers — enables more aggressive optimizations
    target: 'es2020',

    // Raise chunk size warning threshold (Three.js is ~600kb)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'motion-vendor': ['framer-motion', 'gsap'],
          'router-vendor': ['react-router-dom'],
          'scroll-vendor': ['lenis'],
        },
      },
    },
  },

  // Dev server
  server: {
    port: 5173,
    open: true,
  },
})
