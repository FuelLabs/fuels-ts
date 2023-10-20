import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, relative } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log } from '../../utils/logger';

import { shouldUseBuiltinForc } from './shouldUseBuiltinForc';
import { shouldUseBuiltinFuelCore } from './shouldUseBuiltinFuelCore';

export function init(program: Command) {
  const options = program.opts();

  const { path, autoStartFuelCore } = options;

  const fuelsConfigPath = join(path, 'fuels.config.ts');

  if (existsSync(fuelsConfigPath)) {
    throw new Error(`Config file exists, aborting.\n  ${fuelsConfigPath}`);
  }

  const workspace = options.workspace ? relative(path, options.workspace) : undefined;

  const [contracts, scripts, predicates] = ['contracts', 'scripts', 'predicates'].map(
    (optionName) => {
      const pathOrGlob: string = options[optionName];
      if (!pathOrGlob) {
        return undefined;
      }
      const expanded = globSync(pathOrGlob, { cwd: path });
      const relatives = expanded.map((e: string) => relative(path, e));
      return relatives;
    }
  );

  const noneIsInformed = ![workspace, contracts, scripts, predicates].find((v) => v !== undefined);

  if (noneIsInformed) {
    throw new Error(`Workspace not informed.`);
  }

  const output = relative(path, options.output);

  const useBuiltinForc = options.useBuiltinForc ?? shouldUseBuiltinForc();
  const useBuiltinFuelCore = options.useBuiltinForc ?? shouldUseBuiltinFuelCore();

  const renderedConfig = renderFuelsConfigTemplate({
    workspace,
    contracts,
    scripts,
    predicates,
    output,
    useBuiltinForc,
    useBuiltinFuelCore,
    autoStartFuelCore,
  });

  writeFileSync(fuelsConfigPath, renderedConfig);

  log(`Config file created at:\n\n ${fuelsConfigPath}\n`);
}
