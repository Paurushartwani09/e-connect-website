import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for all JS/CSS assets
    compression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
  ],
  base: '/e-connect-website/',

  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // React core — tiny, cached forever
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react'
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          // Framer Motion — largest dep, isolated chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          // Lucide icons — tree-shaken but needs own chunk
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide'
          }
          // React Icons (fi submodule)
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
          // EmailJS
          if (id.includes('node_modules/@emailjs')) {
            return 'vendor-emailjs'
          }
          // React Intersection Observer
          if (id.includes('node_modules/react-intersection-observer')) {
            return 'vendor-observer'
          }
          // All other node_modules
          if (id.includes('node_modules/')) {
            return 'vendor-misc'
          }
        },
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-router-dom',
      'react-intersection-observer',
    ],
  },
})
