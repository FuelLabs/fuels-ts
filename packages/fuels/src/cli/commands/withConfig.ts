import { capitalizeString } from '@fuel-ts/utils';
import type { Command } from 'commander';

import { loadConfig } from '../config/loadConfig';
import type { Commands, FuelsConfig, CommandEvent } from '../types';
import { error, log } from '../utils/logger';

export const withConfigErrorHandler = async (err: Error, config?: FuelsConfig) => {
  error(err);
  if (config) {
    await config.onFailure?.(<Error>err, config);
  }
  throw new Error(err.toString());
};

export function withConfig<CType extends Commands>(
  program: Command,
  command: CType,
  fn: (
    config: FuelsConfig,
    options: Command
  ) => Promise<Extract<CommandEvent, { type: CType }>['data']>
) {
  return async () => {
    const options = program.opts();

    let config: FuelsConfig;

    try {
      config = await loadConfig(options.path);

      try {
        const eventData = await fn(config, program);
        config.onSuccess?.(
          {
            type: command,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: eventData as any,
          },
          config
        );

        log(`🎉  ${capitalizeString(command)} completed successfully!`);
      } catch (err: unknown) {
        await withConfigErrorHandler(<Error>err, config);
      }
    } catch (err) {
      await withConfigErrorHandler(<Error>err);
    }
  };
}
