import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'build',
      sourcemap: !isProd,
      chunkSizeWarningLimit: 500,
      // Minify with esbuild (default, fastest)
      minify: 'esbuild',
      // Keep CSS together but minified
      cssMinify: true,
      rollupOptions: {
        output: {
          // Split vendor libs so they can be cached independently
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/aos')) {
              return 'vendor-aos';
            }
            // Bundle all modal components together — only loaded on demand
            if (
              id.includes('PortfolioModal') ||
              id.includes('CaseStudyModal') ||
              id.includes('BlogModal') ||
              id.includes('ServicesModal') ||
              id.includes('FormModals') ||
              id.includes('PrivacyTermsModal') ||
              id.includes('ProjectRequestModal') ||
              id.includes('LightboxGallery')
            ) {
              return 'chunk-modals';
            }
            // Bundle below-fold content sections together
            if (
              id.includes('/Insights') ||
              id.includes('/Partners') ||
              id.includes('/FAQ') ||
              id.includes('/Contact') ||
              id.includes('/Footer') ||
              id.includes('/BottomNav')
            ) {
              return 'chunk-below-fold';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      'process.env.PUBLIC_URL': JSON.stringify(''),
      'process.env.REACT_APP_GA_MEASUREMENT_ID': JSON.stringify(
        env.VITE_GA_MEASUREMENT_ID || env.REACT_APP_GA_MEASUREMENT_ID || ''
      ),
    },
  };
});
