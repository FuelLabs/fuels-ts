import { spawn } from 'child_process';

import type { FuelsConfig } from '../../types';
import { loggingConfig, log } from '../../utils/logger';

import { onForcExit, onForcError } from './forcHandlers';

export const buildSwayProgram = async (config: FuelsConfig, path: string) => {
  log('Building Sway program', path);

  return new Promise<void>((resolve, reject) => {
    const args = ['build', '-p', path].concat(config.forcBuildFlags);
    const forc = spawn(config.forcPath, args, { stdio: 'pipe' });
    if (loggingConfig.isLoggingEnabled) {
      // eslint-disable-next-line no-console
      forc.stderr?.on('data', (chunk) => console.log(chunk.toString()));

      forc.stderr?.on('data', (chunk) => {
        if (chunk.toString().includes('Aborting')) {
          // because forc logs out 'Aborting due to 2 compilation errors' etc.
          onForcError(reject);
        }
      });
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
