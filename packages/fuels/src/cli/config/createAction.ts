/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Command } from 'commander';
import { resolve } from 'path';

import type { Commands, ParsedFuelsConfig, ActionEvent } from '../../types';
import { logSection } from '../utils';

import { loadConfig } from './loadConfig';

export function createAction<CType extends Commands>(
  program: Command,
  command: CType,
  func: (config: ParsedFuelsConfig) => Promise<Extract<ActionEvent, { type: CType }>['data']>
) {
  return async () => {
    let config: ParsedFuelsConfig | undefined;
    try {
      const options = program.opts();
      const configPath = resolve(process.cwd(), options.path || './');
      config = await loadConfig(configPath);
      const eventData = await func(config);
      config.onSuccess?.(
        {
          type: command,
          data: eventData as any,
        },
        config
      );
      logSection(`🎉 ${command} completed successfully!`);
    } catch (err: any) {
      config?.onFailure?.(err, config);
      throw err;
    }
  };
}
