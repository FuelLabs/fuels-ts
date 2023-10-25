import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, relative, resolve } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log } from '../../utils/logger';

export function init(program: Command) {
  const options = program.opts();

  const { path, workspace, output, autoStartFuelCore, useBuiltinForc, useBuiltinFuelCore } =
    options;

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

  const renderedConfig = renderFuelsConfigTemplate({
    workspace: relative(path, resolve(path, workspace)),
    contracts,
    scripts,
    predicates,
    output: relative(path, resolve(path, output)),
    useBuiltinForc,
    useBuiltinFuelCore,
    autoStartFuelCore,
  });

  writeFileSync(fuelsConfigPath, renderedConfig);

  log(`Config file created at:\n\n ${fuelsConfigPath}\n`);
}
