import { spawn } from 'child_process';

import { log } from '../../log';

import { checkForc } from './checkForc';

export async function buildContract(path: string) {
  await checkForc();
  log('Build', path);
  return new Promise((resolve, reject) => {
    const forcBuild = spawn('forc', ['build', '-p', path], { stdio: 'inherit' });
    forcBuild.on('exit', (code) => {
      if (!code) {
        resolve(code);
        return;
      }
      forcBuild.kill();
      reject();
    });
  });
}
