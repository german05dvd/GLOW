import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    // Plugin PRE para interceptar el favicon antes que Vite
    {
      name: "favicon-override",
      enforce: "pre",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/favicon.ico" || req.url === "/favicon.svg") {
            const svgPath = path.resolve("public/favicon.svg");
            if (fs.existsSync(svgPath)) {
              res.setHeader("Content-Type", "image/svg+xml");
              res.setHeader("Cache-Control", "no-store, must-revalidate");
              res.statusCode = 200;
              res.end(fs.readFileSync(svgPath));
              return;
            }
          }
          next();
        });
      },
    },
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});