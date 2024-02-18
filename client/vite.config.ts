import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api":
        process.env.NODE_ENV === "production"
          ? "https://remembershanigabay.onrender.com"
          : "http://localhost:5000",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
