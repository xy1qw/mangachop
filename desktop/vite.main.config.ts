import { defineConfig } from 'vite';
import { swcPlugin } from "electron-vite"

// https://vitejs.dev/config
export default defineConfig({
    plugins: [swcPlugin()]
});
