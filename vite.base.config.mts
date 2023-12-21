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
<<<<<<< HEAD
      reporter: ["json", "html"],
=======
      reporter: ["json"],
      include: [
        'packages', 'internal', 'apps'
      ],
>>>>>>> 5f12a6b923ef8ce73e9be934f7b7fbb24d7bd31b
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/test/**",
        "**/*.test.ts",
        "**/*.d.ts",
        "packages/fuel-gauge/**",
<<<<<<< HEAD
        "/apps/demo-*",
=======
        "apps/demo-*",
>>>>>>> 5f12a6b923ef8ce73e9be934f7b7fbb24d7bd31b
        "apps/docs",
      ],
    },
  },
});
