import { FuelError } from '@fuel-ts/errors';
import { type Command } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, relative, resolve } from 'path';

import { renderFuelsConfigTemplate } from '../../templates/fuels.config';
import { log } from '../../utils/logger';

export function init(program: Command) {
  const options = program.opts();

  const { path, autoStartFuelCore, forcPath, fuelCorePath, fuelCorePort } = options;

  let workspace: string | undefined;
  let absoluteWorkspace: string | undefined;

  if (options.workspace) {
    absoluteWorkspace = resolve(path, options.workspace);
    workspace = `./${relative(path, absoluteWorkspace)}`;
  }

  const absoluteOutput = resolve(path, options.output);
  const output = `./${relative(path, absoluteOutput)}`;

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
    // eslint-disable-next-line no-console
    console.log(`error: required option '-w, --workspace <path>' not specified\r`);
    process.exit(1);
  } else {
    const fuelsConfigPath = join(path, 'fuels.config.ts');

    if (existsSync(fuelsConfigPath)) {
      throw new FuelError(
        FuelError.CODES.CONFIG_FILE_ALREADY_EXISTS,
        `Config file exists, aborting.\n  ${fuelsConfigPath}`
      );
    }

    const renderedConfig = renderFuelsConfigTemplate({
      workspace,
      contracts,
      scripts,
      predicates,
      output,
      forcPath,
      fuelCorePath,
      autoStartFuelCore,
      fuelCorePort,
    });

    writeFileSync(fuelsConfigPath, renderedConfig);

    log(`Config file created at:\n\n ${fuelsConfigPath}\n`);
  }
}
