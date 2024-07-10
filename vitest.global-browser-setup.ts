/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { spawn } from 'node:child_process';

export default function setup() {
  return new Promise((resolve, reject) => {
    const server = {
      closed: false,
    };
    const serverUrl = 'http://localhost:49342';

    const teardown = async () => {
      if (server.closed) {
        return;
      }
      server.closed = true;
      try {
        await fetch(`${serverUrl}/close-server`);
      } catch (e) {
        console.log('Closing of server failed', e);
      }
      process.exit();
    };

    const cp = spawn('pnpm tsx packages/fuels/src/setup-launch-node-server.ts', {
      detached: true,
      shell: true,
    });

    cp.stderr?.on('data', (chunk) => {
      console.error(chunk.toString());
    });

    cp.stdout?.on('data', (data) => {
      console.log(data.toString());
      resolve(teardown);
    });

    cp.on('error', (err) => {
      console.error('Child process error:', err);
      teardown();
      reject(err);
    });

    cp.on('exit', (code, signal) => {
      console.log('Child process exited with code', code, 'and signal', signal);
      if (code !== 0) {
        reject(new Error(`Server process exited with code ${code}`));
      }
    });

    const cleanupEvents = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'unhandledRejection', 'beforeExit'];
    cleanupEvents.forEach((event) => {
      process.on(event, teardown);
    });
  });
}
