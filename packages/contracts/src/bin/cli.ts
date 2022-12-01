/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander';
import { resolve } from 'path';

import { buildContracts } from '../actions/buildContracts';
import { deployContracts } from '../actions/deployContracts';
import { runAll } from '../actions/runAll';
import { buildTypes } from '../actions/typegen/buildTypes';
import { loadConfig } from '../helpers/loader';
import { error } from '../log';
import type { ContractsConfig, Event } from '../types';
import { Commands } from '../types';

const program = new Command('contracts');

function action<CType extends Commands>(
  command: CType,
  func: (config: ContractsConfig) => Promise<Extract<Event, { type: CType }>['data']>
) {
  return async () => {
    const options = program.opts();
    const configPath = resolve(process.cwd(), options.config);
    const config = await loadConfig(configPath);
    try {
      const eventData = await func(config);
      config.onSuccess?.({
        type: command,
        path: {
          cwd: process.cwd(),
          config: configPath,
        },
        data: eventData as any,
      });
    } catch (err: any) {
      error(err.message ? err.message : err);
      config.onFailure?.(err);
      process.exit();
    }
  };
}

program
  .name('contracts')
  .description('Utility to build, deploy and generate types for Sway Contracts')
  .option('-c, --config <path>', 'Root folder where the config file is located', './');

program
  .command(Commands.build)
  .description('Build sway contracts and generate type')
  .action(action(Commands.build, async (config) => buildContracts(config)));

program
  .command(Commands.deploy)
  .description('deploy contract to fuel network')
  .action(action(Commands.deploy, (config) => deployContracts(config)));

program
  .command(Commands.run)
  .description('build and deploy contracts to fuel network')
  .action(action(Commands.run, (config) => runAll(config)));

program
  .command(Commands.types)
  .description('Generate contract types')
  .action(action(Commands.types, (config) => buildTypes(config)));

export function run(argv: string[]) {
  program.parse(argv);
}
