import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { error, log } from '../../utils/logger';

export function init(program: Command) {
  const options = program.opts();
  const fuelsConfigPath = join(options.path, 'fuels.config.ts');
  const fileExists = existsSync(fuelsConfigPath);

  if (fileExists) {
    error(`Config file exists, aborting.\n\n  ${fuelsConfigPath}\n`);
    process.exit(1);
  }

  const { workspace, output } = options;
  const defaultConfig = renderFuelsConfigTemplate({ workspace, output });

  writeFileSync(fuelsConfigPath, defaultConfig);

  log(`Config file created at:\n\n ${fuelsConfigPath}\n`);
}
