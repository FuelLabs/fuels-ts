import { spawn } from 'child_process';

export async function forcBuild(path: string) {
  return new Promise((resolve, reject) => {
    const subProcess = spawn('forc', ['build', '-p', path], { stdio: 'pipe' });
    // Log outputs from forc build directly to current
    // process output.
    subProcess.stderr?.pipe(process.stdout);
    subProcess.stdout?.pipe(process.stdout);
    subProcess
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
