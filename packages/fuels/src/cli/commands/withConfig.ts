import { capitalizeString } from '@fuel-ts/utils';
import type { Command } from 'commander';

import { loadConfig } from '../config/loadConfig';
import type { Commands, FuelsConfig, CommandEvent } from '../types';
import { error, log } from '../utils/logger';

export function withConfig<CType extends Commands>(
  program: Command,
  command: CType,
  fn: (config: FuelsConfig) => Promise<Extract<CommandEvent, { type: CType }>['data']>
) {
  return async () => {
    const options = program.opts();

    const config = await loadConfig(options.path);

    try {
      const eventData = await fn(config);
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
      error(err);
      config.onFailure?.(<Error>err, config);
    }
  };
}
