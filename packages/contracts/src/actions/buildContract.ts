import { spawn } from 'child_process';
import { log } from 'src/log';

export async function buildContract(path: string) {
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
