import { findBinPath } from '@fuel-ts/wallet/test-utils';
import { spawn } from 'child_process';

import type { FuelsConfig } from '../../types';
import { debug, loggingConfig } from '../../utils/logger';

import { onForcExit, onForcError } from './forcHandlers';

export const buildSwayProgram = async (config: FuelsConfig, path: string) => {
  debug('Building Sway program', path);

  return new Promise<void>((resolve, reject) => {
    const builtInForcPath = findBinPath('fuels-forc');

    const command = config.useBuiltinForc ? builtInForcPath : 'forc';
    const forc = spawn(command, ['build', '-p', path], { stdio: 'pipe' });

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
