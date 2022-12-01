import { spawn } from 'child_process';

export async function checkForc() {
  return new Promise((resolve, reject) => {
    const forcVersion = spawn('forc', ['--version']);
    forcVersion
      .on('exit', (code) => {
        if (!code) {
          resolve(code);
          return;
        }
        reject();
      })
      .on('error', () => {
        reject(
          new Error(
            'Command forc not found!\nCheck your installation or see how to install:\nhttp://fuellabs.github.io/fuelup/latest'
          )
        );
      });
  });
}
