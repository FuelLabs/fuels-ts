import type { Command } from 'commander';

import { loadConfig } from '../config/loadConfig';
import type { Commands, ParsedFuelsConfig, ActionEvent } from '../types';
import { logSection } from '../utils';

export function withConfig<CType extends Commands>(
  program: Command,
  command: CType,
  fn: (config: ParsedFuelsConfig) => Promise<Extract<ActionEvent, { type: CType }>['data']>
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
      logSection(`🎉 ${command} completed successfully!`);
    } catch (err: unknown) {
      config.onFailure?.(<Error>err, config);
      throw err;
    }
  };
}
