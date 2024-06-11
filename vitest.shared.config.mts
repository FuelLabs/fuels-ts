import { loadEnv } from "vite";
import plainText from "vite-plugin-plain-text";
import { defineConfig } from "vitest/config";

const mode = process.env.NODE_ENV || "test";

export default defineConfig({
  plugins: [
    plainText("**/*.hbs", {
      namedExport: false,
    }),
  ],
  esbuild: { target: "es2022" },
  test: {
    coverage: {
      enabled: false,
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
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "/apps/demo-nextjs",
      "/apps/demo-react-cra",
      "/apps/demo-react-vite",
    ],
    globals: true,
    setupFiles: ["./vitest.env.ts"],
    env: loadEnv(mode, process.cwd(), ""),
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 16,
      },
    },
  },
});
