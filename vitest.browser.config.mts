import { nodePolyfills } from "vite-plugin-node-polyfills";
import type { UserConfig } from "vitest/config";
import { mergeConfig, defineProject } from "vitest/config";

import sharedConfig from "./vitest.shared.config.mts";

const config: UserConfig = {
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
        "os",
      ],
      overrides: {
        fs: "memfs",
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["fsevents", "path-scurry", "child_process"],
    include: ["events", "timers/promises"],
  },
  test: {
    coverage: {
      reportsDirectory: "coverage/environments/browser",
    },
    browser: {
      headless: true,
      enabled: true,
      name: "chrome",
    },
    env: { TEST_ENV: "browser" },
  },
};

export default mergeConfig(sharedConfig, defineProject(config));
