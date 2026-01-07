import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // You likely already have this or passed it via CLI
    port: 5173,
    // ADD THIS SECTION BELOW:
    allowedHosts: [
      "nonkeyword_frontend",
      "localhost",
      "aleph-frontend"
    ]
  }
});
