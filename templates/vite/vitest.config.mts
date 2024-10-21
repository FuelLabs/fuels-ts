import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { target: "es2022" },
  test: {
    exclude: ["**/test/ui/**", "**/node_modules/**"],
  },
});
