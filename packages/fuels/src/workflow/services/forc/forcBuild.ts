import { spawn } from 'child_process';

import type { ParsedFuelsConfig } from '../../types';

export async function forcBuild(config: ParsedFuelsConfig, path: string) {
  return new Promise((resolve, reject) => {
    const command = config.useSystemForc ? 'forc' : './node_modules/.bin/fuels-forc';
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
