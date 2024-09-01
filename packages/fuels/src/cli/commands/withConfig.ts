import { capitalizeString } from '@fuel-ts/utils';
import type { Command } from 'commander';

import { loadConfig } from '../config/loadConfig';
import type { Commands, FuelsConfig, CommandEvent } from '../types';
import { error, log } from '../utils/logger';

export const withConfigErrorHandler = async (err: Error, config?: FuelsConfig) => {
  error(err.message);
  if (config) {
    await config.onFailure?.(config, <Error>err);
  }
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
      await withConfigErrorHandler(<Error>err);
      return;
    }

    try {
      await fn(config, program);
      log(`🎉  ${capitalizeString(command)} completed successfully!`);
    } catch (err: unknown) {
      await withConfigErrorHandler(<Error>err, config);
    }
  };
}
