import plainText from "vite-plugin-plain-text";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    plainText("**/*.hbs", {
      namedExport: false,
    }),
  ],
  test: {
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "/apps/demo-nextjs",
      "/apps/demo-react-cra",
      "/apps/demo-react-vite",
    ],
    globals: true,
    ui: false,
    setupFiles: ["./vite.env.ts"],
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["json"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/test/**",
        "**/*.test.ts",
        "**/*.d.ts",
        "packages/fuel-gauge/**",
        "apps/demo-*",
        "apps/docs",
      ],
    },
  },
});
