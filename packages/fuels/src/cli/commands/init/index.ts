import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log } from '../../utils/logger';

import { shouldUseBuiltinFuelCore } from './shouldUseBuiltinFuelCore';
import { shouldUseBuiltinForc } from './shouldUserBuiltinForc';

export async function init(program: Command) {
  const options = program.opts();
  const fuelsConfigPath = join(options.path, 'fuels.config.ts');
  const fileExists = existsSync(fuelsConfigPath);

  if (fileExists) {
    throw new Error(`Config file exists, aborting.\n\n  ${fuelsConfigPath}\n`);
  }

  const { path } = options;

  const workspace = relative(path, options.workspace);
  const output = relative(path, options.output);

  const useBuiltinForc = await shouldUseBuiltinForc(options.useBuiltinForc);
  const useBuiltinFuelCore = await shouldUseBuiltinFuelCore(options.useBuiltinFuelCore);

  const defaultConfig = renderFuelsConfigTemplate({
    workspace,
    output,
    useBuiltinForc,
    useBuiltinFuelCore,
  });

  writeFileSync(fuelsConfigPath, defaultConfig);

  log(`Config file created at:\n\n ${fuelsConfigPath}\n`);
}
