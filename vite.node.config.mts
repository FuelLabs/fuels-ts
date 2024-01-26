import type { UserConfig } from "vitest/config";
import { mergeConfig } from "vitest/config";

import baseConfig from "./vite.base.config.mts";

const config: UserConfig = {
  test: {
    coverage: {
      reportsDirectory: "coverage/environments/node",
    },
  },
};

export default mergeConfig(baseConfig, config);
