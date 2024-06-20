import { spawn } from 'node:child_process';

export default async function setup() {
  return new Promise((resolve, reject) => {
    const cp = spawn('pnpm tsx packages/fuels/src/setup-launch-node-server.ts', {
      detached: true,
      shell: 'sh',
    });

    const killServer = () => {
      if (cp.pid) {
        // https://github.com/nodejs/node/issues/2098#issuecomment-169549789
        process.kill(-cp.pid);
      }
    };

    cp.stdout?.on('data', () => {
      // Return teardown function to be called when tests finish
      // It will kill the server
      resolve(killServer);
    });

    cp.on('error', (err) => {
      // Ensure server is killed if there's an error
      killServer();
      reject(err);
    });

    cp.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Server process exited with code ${code}`));
      }
    });
  });
}
