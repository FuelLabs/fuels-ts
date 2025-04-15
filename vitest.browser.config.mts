import { nodePolyfills } from "vite-plugin-node-polyfills";
import type { ViteUserConfig } from "vitest/config";
import { mergeConfig, defineProject } from "vitest/config";

import sharedConfig from "./vitest.shared.config.mts";

const config: ViteUserConfig = {
  plugins: [
    nodePolyfills({
      globals: {
        process: true,
        Buffer: true,
        global: true,
      },
      include: [
        "crypto",
        "buffer",
        "fs",
        "events",
        "timers/promises",
        "util",
        "stream",
        "path",
        "fs",
        "os",
      ],
      overrides: {
        fs: "memfs",
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      "fsevents",
      "path-scurry",
      "@vitest/coverage-istanbul",
      "chromium-bidi",
    ],
    include: ["events", "timers/promises"],
    entries: ["**/*.test.ts"],
  },
  test: {
    env: {
      LAUNCH_NODE_SERVER_PORT: "49342",
    },
    globalSetup: ["./vitest.global-browser-setup.ts"],
    coverage: {
      reportsDirectory: "coverage/environments/browser",
    },
    browser: {
      provider: "playwright",
      headless: true,
      enabled: true,
      name: "chromium",
      // Avoids taking screenshots
      screenshotFailures: false,
    },
  },
};

export default mergeConfig(sharedConfig, defineProject(config));
