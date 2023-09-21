import { spawn } from 'child_process';
import { join } from 'path';

import { findPackageRoot } from '../../cli/utils/findPackageRoot';
import type { ParsedFuelsConfig } from '../../types';

export async function forcBuild(config: ParsedFuelsConfig, path: string) {
  const pkgRootDir = findPackageRoot();

  return new Promise((resolve, reject) => {
    const forcPath = join(pkgRootDir, 'node_modules', '.bin', 'fuels-forc');

    const command = config.useSystemForc ? 'forc' : forcPath;
    const forc = spawn(command, ['build', '-p', path], { stdio: 'pipe' });

    forc.stderr?.pipe(process.stdout);
    forc.stdout?.pipe(process.stdout);

    forc
      .on('exit', (code) => {
        if (!code) {
          resolve(code);
          return;
        }
        reject();
      })
      .on('error', () => {
        reject();
      });
  });
}
