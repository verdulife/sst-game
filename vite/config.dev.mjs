import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url'

export default defineConfig({
    base: './',
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("../src", import.meta.url))
            }
        ]
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
