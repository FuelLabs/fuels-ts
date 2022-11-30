import { Command } from 'commander';
import { join } from 'path';
import { buildContracts } from 'src/actions/buildContracts';
import { buildTypes } from 'src/actions/buildTypes';
import { deployContracts } from 'src/actions/deployContracts';
import { runAll } from 'src/actions/runAll';
import { loadConfig } from 'src/helpers/loader';
import type { ContractsConfig } from 'src/types';
import { Commands } from 'src/types';

const program = new Command('contracts');

function action(command: string, func: (config: ContractsConfig) => Promise<unknown>) {
  return async () => {
    const options = program.opts();
    const config = await loadConfig(join(process.cwd(), options.config));
    try {
      const result: unknown = await func(config);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.onSuccess?.({
        type: command as Commands,
        data: result,
      } as Event);
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error((err as Error)?.message ?? err);
      config.onFailure?.(err);
      process.exit();
    }
  };
}

program
  .name('Contracts')
  .description('Utility to build, deploy and generate types for Sway Contracts')
  .option('-c, --config <path>', 'Path to config file', 'contracts.config.js');

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

program.parse(process.argv);
