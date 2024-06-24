/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { spawn } from 'node:child_process';

export default function setup() {
  return new Promise((resolve, reject) => {
    const server = {
      closed: false,
    };
    const teardown = async () => {
      if (server.closed) {
        return;
      }
      server.closed = true;
      const serverUrl = `http://localhost:49342`;
      try {
        await fetch(`${serverUrl}/close-server`);
      } catch (e) {
        console.log('closing of server failed', e);
      }
      process.exit();
    };

    const cp = spawn('pnpm tsx packages/fuels/src/setup-launch-node-server.ts', {
      detached: true,
      shell: 'sh',
    });

    cp.stderr?.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    cp.stdout?.on('data', (data) => {
      console.log(data.toString());
      // Return teardown function to be called when tests finish
      // It will kill the server
      resolve(teardown);
    });

    cp.on('error', (err) => {
      console.log(err);
      // Ensure server is killed if there's an error
      teardown();
      reject(err);
    });

    cp.on('exit', (code, signal) => {
      console.log('error code', code, signal);
      if (code !== 0) {
        reject(new Error(`Server process exited with code ${code}`));
      }
    });

    process.on('SIGINT', teardown);
    process.on('SIGUSR1', teardown);
    process.on('SIGUSR2', teardown);
    process.on('uncaughtException', teardown);
    process.on('unhandledRejection', teardown);
    process.on('beforeExit', teardown);
  });
}
