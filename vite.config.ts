import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "Transcripción de audio en tiempo real",
        "short_name": "Transcripción",
        "description": "Herramienta para hablar y transcribir",
        "start_url": "/",
        "scope": "/",
        "display": "minimal-ui",
        "orientation": "any",
        "background_color": "#ffffff",
        "theme_color": "#EE2553",
        "lang": "es",
        "categories": [
          "productividad",
          "utilidades",
          "herramientas"
        ],
        "icons": [
          {
            "src": "/icons/icon-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      },
    }),
  ],
});