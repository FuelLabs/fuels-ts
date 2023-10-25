import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, relative } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log } from '../../utils/logger';

export function init(program: Command) {
  const options = program.opts();

  const { path, autoStartFuelCore, useBuiltinForc, useBuiltinFuelCore } = options;

  const workspace = options.workspace ? relative(path, options.workspace) : undefined;

  const [contracts, scripts, predicates] = ['contracts', 'scripts', 'predicates'].map(
    (optionName) => {
      const pathOrGlob: string = options[optionName];
      if (!pathOrGlob) {
        return undefined;
      }
      const expanded = globSync(pathOrGlob, { cwd: path });
      const relatives = expanded.map((e) => relative(path, e));
      return relatives;
    }
  );

  const noneIsInformed = ![workspace, contracts, scripts, predicates].find((v) => v !== undefined);

  if (noneIsInformed) {
    // mimicking commander property validation
    process.stdout.write(`error: required option '-w, --workspace <path>' not specified\r`);
    process.exit(1);
  }

  const fuelsConfigPath = join(path, 'fuels.config.ts');

  if (existsSync(fuelsConfigPath)) {
    throw new Error(`Config file exists, aborting.\n  ${fuelsConfigPath}`);
  }

  const output = relative(path, options.output);

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
