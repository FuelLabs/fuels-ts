import { green, red } from 'chalk';
import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log, logSection } from '../../utils/logger';

export function init(program: Command) {
  const options = program.opts();
  const fuelsConfigPath = join(options.path, 'fuels.config.ts');
  const fileExists = existsSync(fuelsConfigPath);

  if (fileExists) {
    logSection(`Config file exists, aborting\n  ${red(fuelsConfigPath)}`);
    process.exit(1);
  }

  const { workspace, output } = options;
  const defaultConfig = renderFuelsConfigTemplate({ workspace, output });

  writeFileSync(fuelsConfigPath, defaultConfig);

  log(`Config file created at:\n  ${green(fuelsConfigPath)}`);
}
