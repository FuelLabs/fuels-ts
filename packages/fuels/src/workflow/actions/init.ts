import { green, red } from 'chalk';
import type { Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

import { resolveProjectCwd } from '../cli/utils/resolveProjectCwd';
import { renderFuelsConfigTemplate } from '../templates/fuels.config';
import { log } from '../utils';

export const init = (program: Command) => () => {
  const options = program.opts();
  const cwd = resolveProjectCwd(options);

  const fuelsConfigPath = join(cwd, 'fuels.config.ts');
  const fileExists = existsSync(fuelsConfigPath);

  if (fileExists) {
    log(`Config file exists, aborting\n  ${red(fuelsConfigPath)}`);
    process.exit(1);
  }

  const defaultConfig = renderFuelsConfigTemplate();

  writeFileSync(fuelsConfigPath, defaultConfig);

  log(`Config file created at:\n  ${green(fuelsConfigPath)}`);
};
