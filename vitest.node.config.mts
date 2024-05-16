import type { UserConfig } from "vitest/config";
import { mergeConfig, defineProject } from "vitest/config";

import sharedConfig from "./vitest.shared.config.mts";

const config: UserConfig = {
  test: {
    coverage: {
      reportsDirectory: "coverage/environments/node",
    },
  },
};

export default mergeConfig(sharedConfig, defineProject(config));
