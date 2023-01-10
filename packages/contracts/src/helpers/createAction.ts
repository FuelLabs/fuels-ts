/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Command } from 'commander';
import { resolve } from 'path';

import { error } from '../log';
import type { Commands, ContractsConfig, Event } from '../types';

import { loadConfig } from './loader';

export function createAction<CType extends Commands>(
  program: Command,
  command: CType,
  func: (config: ContractsConfig) => Promise<Extract<Event, { type: CType }>['data']>
) {
  return async () => {
    try {
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
    } catch (err: any) {
      error(err.message ? err.message : err);
      process.exit();
    }
  };
}
