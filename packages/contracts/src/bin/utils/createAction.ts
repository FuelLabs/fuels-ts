/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Command } from 'commander';
import { resolve } from 'path';

import type { Commands, LoadedConfig, ActionEvent } from '../../types';
import { error, logSection } from '../../utils';

import { loadConfig } from './loadConfig';

export function createAction<CType extends Commands>(
  program: Command,
  command: CType,
  func: (config: LoadedConfig) => Promise<Extract<ActionEvent, { type: CType }>['data']>
) {
  return async () => {
    const options = program.opts();
    const configPath = resolve(process.cwd(), options.config);
    const config = await loadConfig(configPath);
    try {
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
      error(err.message ? err.message : err);
      config.onFailure?.(err, config);
      throw err;
    }
  };
}
