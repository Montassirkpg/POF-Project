// vite.config.js
export default {
  server: {
    port: 3000, // Le frontend tournera sur localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Adresse de ton backend
        changeOrigin: true,
        secure: false
      }
    }
  }
}
