import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
          // Feature-based chunks
          'components': [
            './src/components/AdvancedSEO.jsx',
            './src/components/ThemeProvider.jsx',
            './src/components/LanguageProvider.jsx',
            './src/components/ThemeToggle.jsx',
            './src/components/LanguageToggle.jsx'
          ],
          'tools': [
            './src/components/AnalyticsDashboard.jsx',
            './src/components/AIPersonalization.jsx',
            './src/components/AdvancedPWA.jsx',
            './src/components/PerformanceMonitor.jsx'
          ],
          'optimization': [
            './src/components/OptimizedImage.jsx',
            './src/hooks/useImageOptimization.js'
          ]
        },
      },
    },
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
  base: '/',
  server: {
    fs: {
      allow: ['..']
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      // Exclude heavy dependencies that should be loaded on demand
    ]
  }
})
