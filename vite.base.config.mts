import plainText from "vite-plugin-plain-text";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    plainText("**/*.hbs", {
      namedExport: false,
    }),
  ],
  esbuild: { target: "es2022" },
  test: {
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "/apps/demo-nextjs",
      "/apps/demo-react-cra",
      "/apps/demo-react-vite",
    ],
    globals: true,
    setupFiles: ["./vite.env.ts"],
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["json", "text", "html"],
      include: ["packages", "internal", "apps"],
      exclude: [
        "**/*.js",
        "**/node_modules/**",
        "**/dist/**",
        "**/test/**",
        "**/*.test.ts",
        "**/*.d.ts",
        "**/bin.ts",
        "packages/fuel-gauge/**",
        "apps/demo-*",
        "apps/docs",
      ],
    },
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 16,
      },
    },
  },
});
