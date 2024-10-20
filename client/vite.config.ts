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
    port: Number(process.env.APP_PORT) || 5172,
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
});
