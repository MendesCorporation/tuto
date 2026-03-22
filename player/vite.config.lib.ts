import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Build config for distributing DemoPlayer as a library.
// Generates ES + UMD bundles in dist-lib/.
// React and framer-motion are marked as peerDependencies (not bundled).

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-lib',
    lib: {
      entry: path.resolve(__dirname, 'src/lib.tsx'),
      name: 'TutoPlayer',
      formats: ['es', 'umd'],
      fileName: (format) => `tuto-player.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'framer-motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
        },
      },
    },
  },
});
