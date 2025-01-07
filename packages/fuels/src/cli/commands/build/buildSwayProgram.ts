import { spawn } from 'child_process';

import type { FuelsConfig } from '../../types';
import { debug, loggingConfig } from '../../utils/logger';

import { onForcExit, onForcError } from './forcHandlers';

export const buildSwayProgram = async (config: FuelsConfig, path: string) => {
  debug('Building Sway program', path);

  return new Promise<void>((resolve, reject) => {
    const args = ['build', '-p', path].concat(config.forcBuildFlags);
    const forc = spawn(config.forcPath, args, { stdio: 'pipe' });
    if (loggingConfig.isLoggingEnabled) {
      // eslint-disable-next-line no-console
      forc.stderr?.on('data', (chunk) => console.log(chunk.toString()));
    }

    if (loggingConfig.isDebugEnabled) {
      forc.stdout?.on('data', (chunk) => {
        // eslint-disable-next-line no-console
        console.log(chunk.toString());
      });
    }

    const onExit = onForcExit(resolve, reject);
    const onError = onForcError(reject);

    forc.on('exit', onExit);
    forc.on('error', onError);
  });
};
