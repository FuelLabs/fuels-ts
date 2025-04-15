import { FuelError } from '@fuel-ts/errors';
import { type Command } from 'commander';
import { existsSync, statSync, writeFileSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';

import { findPrograms } from '../../config/forcUtils';
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

  const convertFilePathToDir = (filePath: string) =>
    statSync(resolve(path, filePath)).isDirectory() ? filePath : dirname(filePath);

  const [contracts, scripts, predicates] = ['contracts', 'scripts', 'predicates'].map(
    (optionName) => {
      // Globs `/*` get expanded by the OS auto-magically
      const paths: string[] = options[optionName];
      if (!paths) {
        return undefined;
      }

      const selectedSwayType = optionName.slice(0, -1);

      const programs = paths
        .map(convertFilePathToDir)
        .flatMap((pathOrGlob) => findPrograms(pathOrGlob, { cwd: path }));
      const programDirs = programs
        .filter(({ swayType }) => swayType === selectedSwayType)
        .map(({ path: programPath }) => relative(path, programPath));

      return [...new Set(programDirs)];
    }
  );

  // Check that at least one of the options is informed
  const noneIsInformed = ![workspace, contracts, scripts, predicates].find((v) => v !== undefined);
  if (noneIsInformed) {
    // mimicking commander property validation
    // We want to use `console.log` here to avoid the ability to turn off this command prompt.
    // eslint-disable-next-line no-console
    console.log(`error: required option '-w, --workspace <path>' not specified\r`);
    process.exit(1);
  }

  // Ensure that every program that is defined, has at least one program
  const programLengths = [contracts, scripts, predicates]
    .filter(Boolean)
    .map((programs) => programs?.length);
  if (programLengths.some((length) => length === 0)) {
    const [contractLength, scriptLength, predicateLength] = programLengths;

    const message = ['error: unable to detect program/s'];
    if (contractLength === 0) {
      message.push(`- contract/s detected ${contractLength}`);
    }
    if (scriptLength === 0) {
      message.push(`- script/s detected ${scriptLength}`);
    }
    if (predicateLength === 0) {
      message.push(`- predicate/s detected ${predicateLength}`);
    }

    log(message.join('\r\n'));
    process.exit(1);
  }

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
