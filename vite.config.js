import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      },
      // Stub react-stripe modules to prevent errors - these are transitive dependencies
      {
        find: 'react-stripe',
        replacement: path.resolve(__dirname, "./src/stubs/react-stripe.js")
      },
      {
        find: '@stripe/react-stripe-js',
        replacement: path.resolve(__dirname, "./src/stubs/@stripe-react-stripe-js.js")
      },
      {
        find: '@stripe/stripe-js/pure/index.js',
        replacement: path.resolve(__dirname, "./src/stubs/stripe-js-pure.js")
      },
      {
        find: '@stripe/stripe-js/pure',
        replacement: path.resolve(__dirname, "./src/stubs/stripe-js-pure.js")
      },
      {
        find: '@stripe/stripe-js',
        replacement: path.resolve(__dirname, "./src/stubs/stripe-js.js")
      },
      // Also handle the prop-types issue
      {
        find: 'prop-types',
        replacement: path.resolve(__dirname, "./src/stubs/prop-types.js")
      }
    ],
    dedupe: ['react', 'react-dom']
  },
  build: {
    assetsDir: 'assets',
    // Enable compression for better document delivery
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // Aggressive compression for smaller file size
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error'],
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        passes: 3, // Increased passes for better compression
        dead_code: true,
        unused: true,
        collapse_vars: true,
        reduce_vars: true,
        reduce_funcs: true,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      mangle: {
        properties: false,
        safari10: true,
      },
    },
    // Disable source maps in production for smaller file size
    sourcemap: false,
    // Optimize chunk size - reduced threshold for better splitting
    chunkSizeWarningLimit: 800,
    // Optimize asset inlining - inline small assets to reduce requests
    assetsInlineLimit: 4096, // 4kb
    // Combine all CSS into one file for better caching and fewer requests
    cssCodeSplit: false,
    // Minify CSS
    cssMinify: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Optimize chunk splitting for better caching and parallel loading
        manualChunks: (id) => {
          // Vendor chunks for better caching and parallel loading
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Split framer-motion into separate chunk (can be lazy loaded)
            // Framer Motion is large, so lazy load it for better initial load
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Split lucide-react icons into separate chunk (large library)
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            // Split formspree into separate chunk
            if (id.includes('@formspree')) {
              return 'formspree';
            }
            // Other vendor libraries
            return 'vendor';
          }
          // Feature-based chunks for better code splitting
          if (id.includes('components/AdvancedSEO') || 
              id.includes('components/ThemeProvider') || 
              id.includes('components/LanguageProvider')) {
            return 'core-components';
          }
          if (id.includes('components/AnalyticsDashboard') || 
              id.includes('components/AIPersonalization') || 
              id.includes('components/AdvancedPWA') || 
              id.includes('components/PerformanceMonitor')) {
            return 'tools';
          }
          if (id.includes('components/OptimizedImage') || 
              id.includes('hooks/useImageOptimization')) {
            return 'optimization';
          }
          // Lazy-loaded components
          if (id.includes('components/LazyWrapper') ||
              id.includes('components/AIContentGenerator') ||
              id.includes('components/CRMIntegration') ||
              id.includes('components/EmailMarketing')) {
            return 'lazy-components';
          }
        },
      },
    },
  },
  publicDir: 'public',
  server: {
    fs: {
      allow: ['..']
    },
    // Improve HMR stability
    hmr: {
      overlay: true,
      // Reduce HMR timeout to prevent stale connections
      timeout: 20000
    },
    // Prevent connection issues
    watch: {
      usePolling: false
    },
    // Reduce connection resets
    strictPort: false
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-helmet-async',
      // Include commonly used dependencies to prevent frequent re-optimization
      // framer-motion is in separate chunk and can be lazy loaded
      'lucide-react',
      '@formspree/react'
    ],
    exclude: [
      // No exclusions - let Vite handle optimization naturally
    ],
    // Don't force optimization on every restart - only when needed
    force: false,
    // Pre-bundle only critical dependencies
    esbuildOptions: {
      target: 'es2020',
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }
  },
  // Improve tree-shaking and minification
  esbuild: {
    treeShaking: true,
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    target: 'es2020',
    format: 'esm',
    // Remove unused code more aggressively
    pure: ['console.log', 'console.info', 'console.debug'],
  }
})
