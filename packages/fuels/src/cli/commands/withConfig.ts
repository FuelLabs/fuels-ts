import { capitalizeString } from '@fuel-ts/utils';
import type { Command } from 'commander';

import { loadConfig } from '../config/loadConfig';
import type { Commands, FuelsConfig, CommandEvent } from '../types';
import { log } from '../utils/logger';

export const withConfigErrorHandler = (err: Error, config?: FuelsConfig) => {
  config?.onFailure?.(config, <Error>err);
  throw err;
};

export function withConfig<CType extends Commands>(
  program: Command,
  command: CType,
  fn: (
    config: FuelsConfig,
    options?: Command
  ) => Promise<Extract<CommandEvent, { type: CType }>['data']>
) {
  return async () => {
    const options = program.opts();

    let config: FuelsConfig;

    try {
      config = await loadConfig(options.path);
    } catch (err) {
      withConfigErrorHandler(<Error>err);
      return;
    }

    try {
      await fn(config, program);
      log(`🎉  ${capitalizeString(command)} completed successfully!`);
    } catch (err: unknown) {
      withConfigErrorHandler(<Error>err, config);
    }
  };
}
