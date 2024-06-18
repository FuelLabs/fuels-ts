import { spawn } from 'node:child_process';

export default async function setup() {
  return new Promise((resolve, reject) => {
    const cp = spawn('pnpm tsx packages/fuels/src/setup-launch-node-server.ts', {
      detached: true,
      shell: 'sh',
    });

    cp.stdout?.on('data', () => {
      // return teardown function to be called when tests finish
      // it will kill the server
      resolve(() => {
        // https://github.com/nodejs/node/issues/2098#issuecomment-169549789
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.kill(-cp.pid!);
      });
    });

    cp.on('error', (err) => {
      reject(err);
    });
  });
}
