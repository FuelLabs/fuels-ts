import { spawn } from 'child_process';
import { join } from 'path';

import type { FuelsConfig } from '../../types';
import { findPackageRoot } from '../../utils/findPackageRoot';
import { debug, log, loggingConfig } from '../../utils/logger';

type ResolveFn = () => void;
type RejectFn = (reason?: number | Error) => void;

export const onForcExit = (resolve: ResolveFn, reject: RejectFn) => (code: number | null) => {
  if (code) {
    reject(code);
    // process.exit()?
  } else {
    resolve();
  }
};

export const onForcError = (reject: RejectFn) => (error: Error) => {
  reject(error);
};

export const buildSwayProgram = async (config: FuelsConfig, path: string) => {
  debug('Building Sway program', path);

  return new Promise<void>((resolve, reject) => {
    const pkgRootDir = findPackageRoot();
    const forcPath = join(pkgRootDir, 'node_modules', '.bin', 'fuels-forc');

    const command = config.useBuiltinForc ? forcPath : 'forc';
    const forc = spawn(command, ['build', '-p', path], { stdio: 'pipe' });

    if (loggingConfig.isLoggingEnabled) {
      forc.stderr?.pipe(process.stderr);
    }

    if (loggingConfig.isDebugEnabled) {
      forc.stdout?.pipe(process.stdout);
    }

    const onExit = onForcExit(resolve, reject);
    const onError = onForcError(reject);

    forc.on('exit', onExit).on('error', onError);
  });
};

export async function buildSwayPrograms(config: FuelsConfig) {
  log('Building Sway programs..');

  const paths = config.workspace
    ? [config.workspace]
    : [config.contracts, config.predicates, config.scripts].flat();

  await Promise.all(paths.map((path) => buildSwayProgram(config, path)));
}
