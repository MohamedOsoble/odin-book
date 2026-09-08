import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
//import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [reactRouter(), tailwindcss()],
// });

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild ? { input: "./server/app.js" } : undefined,
  },
  plugins: [reactRouter(), tailwindcss()],
}));
