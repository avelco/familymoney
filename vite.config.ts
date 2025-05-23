import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["@prisma/client"],
  },
  build: { target: "esnext" },
  optimizeDeps: {
    exclude: [
      "@mapbox/node-pre-gyp",
      "sqlite3",
    ],
  },
  server: {
    allowedHosts: [
      "familymoney.store",
      "www.familymoney.store"
    ],
  },
});
