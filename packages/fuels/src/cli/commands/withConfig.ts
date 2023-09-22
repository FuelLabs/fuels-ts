import type { Command } from 'commander';

import { loadConfig } from '../cli/utils/loadConfig';
import type { Commands, ParsedFuelsConfig, ActionEvent } from '../types';
import { logSection } from '../utils';

export function withConfig<CType extends Commands>(
  program: Command,
  command: CType,
  func: (config: ParsedFuelsConfig) => Promise<Extract<ActionEvent, { type: CType }>['data']>
) {
  return async () => {
    let config: ParsedFuelsConfig | undefined;
    try {
      const options = program.opts();
      config = await loadConfig(options.path);
      const eventData = await func(config);
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
      config?.onFailure?.(<Error>err, config);
      throw err;
    }
  };
}
