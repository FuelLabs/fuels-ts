import type { spawn } from 'child_process';

import type { FuelsConfig } from '../../types';
import { debug, loggingConfig } from '../../utils/logger';

import { onForcExit, onForcError } from './forcHandlers';

export const buildSwayProgram = async (config: FuelsConfig, path: string) => {
  debug('Building Sway program', path);

  let spawnFn: typeof spawn;

  if (!process.env.TEST || process.env.TEST_ENV === 'node') {
    const { spawn: spawnChildProcess } = await import('child_process');
    spawnFn = spawnChildProcess;
  }

  return new Promise<void>((resolve, reject) => {
    const args = ['build', '-p', path].concat(config.forcBuildFlags);
    const forc = spawnFn(config.forcPath, args, { stdio: 'pipe' });

    if (loggingConfig.isLoggingEnabled) {
      forc.stderr?.pipe(process.stderr);
    }

    if (loggingConfig.isDebugEnabled) {
      forc.stdout?.pipe(process.stdout);
    }

    const onExit = onForcExit(resolve, reject);
    const onError = onForcError(reject);

    forc.on('exit', onExit);
    forc.on('error', onError);
  });
};
