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
      // Disable sourcemaps in production — saves ~300 KB of network overhead
      sourcemap: !isProd,
      // Warn if any chunk exceeds 500 KB
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-aos': ['aos'],
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
