import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      ".ngrok-free.app", // mengizinkan semua subdomain dari ngrok-free.app
      ".loca.lt",
    ],
  },
  build: {
    sourcemap: true, // Enable source maps for production
  },
});
