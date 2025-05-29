import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
// import fs from 'fs';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    // For hosting on local network
    server: {
        host: '192.168.236.51',
        port: 5173,
        https: {
            key: fs.readFileSync('certs/192.168.236.51-key.pem'),
            cert: fs.readFileSync('certs/192.168.236.51.pem'),
        },
        strictPort: true,
        cors: true, // enable CORS if needed
    },
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
