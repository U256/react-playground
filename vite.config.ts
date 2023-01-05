import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import viteCompression from 'vite-plugin-compression'; // OR vite-plugin-compress ?

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [viteCompression()],
})
