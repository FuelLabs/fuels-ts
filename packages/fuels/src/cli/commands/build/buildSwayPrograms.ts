import { spawn } from 'child_process';

import type { FuelsConfig } from '../../types';
import { findBinPath } from '../../utils/findBinPath';
import { getBinarySource } from '../../utils/getBinarySource';
import { debug, error, log, loggingConfig } from '../../utils/logger';

type OnResultFn = () => void;
type OnErrorFn = (reason?: number | Error) => void;

export const onForcExit =
  (onResultFn: OnResultFn, onErrorFn: OnErrorFn) => (code: number | null) => {
    if (code) {
      onErrorFn(code);
      // process.exit()?
    } else {
      onResultFn();
    }
  };

export const onForcError = (onError: OnErrorFn) => (err: Error) => {
  error(err);
  onError(err);
};

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

export async function buildSwayPrograms(config: FuelsConfig) {
  log(`Building Sway programs using ${getBinarySource(config.useBuiltinFuelCore)} 'forc' binary`);

  const paths = config.workspace
    ? [config.workspace]
    : [config.contracts, config.predicates, config.scripts].flat();

  await Promise.all(paths.map((path) => buildSwayProgram(config, path)));
}
