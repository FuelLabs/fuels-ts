import codspeedPlugin from "@codspeed/vitest-plugin";
import { loadEnv } from "vite";
import json5Plugin from "vite-plugin-json5";
import plainText from "vite-plugin-plain-text";
import { defineConfig } from "vitest/config";

const mode = process.env.NODE_ENV || "test";

export default defineConfig({
  plugins: [
    json5Plugin(),
    plainText("**/*.hbs", {
      namedExport: false,
    }),
    codspeedPlugin(),
  ],
  esbuild: { target: "es2022" },
  test: {
    globalSetup: ["vitest.global-setup.ts"],
    setupFiles: ["./packages/fuel-gauge/src/test/setup.ts"],
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
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "/apps/demo-nextjs",
      "/apps/demo-react-cra",
      "/apps/demo-react-vite",
    ],
    globals: true,
    env: loadEnv(mode, process.cwd(), ""),
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 16,
      },
    },
  },
});
