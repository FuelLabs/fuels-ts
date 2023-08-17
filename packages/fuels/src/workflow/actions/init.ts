import type { Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

import { resolveProjectCwd } from '../cli/utils/resolveProjectCwd';
import { logSection } from '../utils';

export const init = (program: Command) => () => {
  const options = program.opts();
  const cwd = resolveProjectCwd(options);

  const fuelsConfigPath = join(cwd, 'fuels.config.ts');
  const fileExists = existsSync(fuelsConfigPath);

  if (fileExists) {
    throw Error(`File exists, aborting — ${fuelsConfigPath}`);
  }

  const defaultConfig = `
  import { createConfig, ActionEvent, LoadedConfig } from "fuels";

  export default createConfig({
    privateKey: "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298",
    workspace: "./sway-programs",
    output: "./types"
  });
`;

  writeFileSync(fuelsConfigPath, defaultConfig);

  logSection(`Config file created at:\n  ${fuelsConfigPath}`);
};
