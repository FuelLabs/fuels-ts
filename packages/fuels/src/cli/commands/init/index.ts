import { getSystemForc, getSystemFuelCore } from '@fuel-ts/versions/cli';
import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log } from '../../utils/logger';

export function init(program: Command) {
  const options = program.opts();
  const fuelsConfigPath = join(options.path, 'fuels.config.ts');
  const fileExists = existsSync(fuelsConfigPath);

  if (fileExists) {
    throw new Error(`Config file exists, aborting.\n\n  ${fuelsConfigPath}\n`);
  }

  const { path } = options;

  const workspace = relative(path, options.workspace);
  const output = relative(path, options.output);

  let useBuiltinForc: boolean = options.useBuiltinForc;
  let useBuiltinFuelCore: boolean = options.useBuiltinFuelCore;

  if (useBuiltinForc === undefined) {
    const { systemForcVersion } = getSystemForc();
    useBuiltinForc = !systemForcVersion;
  }

  if (useBuiltinFuelCore === undefined) {
    const { systemFuelCoreVersion } = getSystemFuelCore();
    useBuiltinFuelCore = !systemFuelCoreVersion;
  }

  const defaultConfig = renderFuelsConfigTemplate({
    workspace,
    output,
    useBuiltinForc,
    useBuiltinFuelCore,
  });

  writeFileSync(fuelsConfigPath, defaultConfig);

  log(`Config file created at:\n\n ${fuelsConfigPath}\n`);
}
