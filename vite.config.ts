import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 443,
    host: "0.0.0.0",
    hmr: {
      host: "localhost",
      port: 443,
    },
    https:
      import.meta.env.MODE === "development"
        ? {
            key: fs.readFileSync("./.cert/localhost-key.pem"),
            cert: fs.readFileSync("./.cert/localhost.pem"),
          }
        : {},
  },
});
