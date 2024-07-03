/* eslint-disable no-console */
import http from 'http';
import type { AddressInfo } from 'net';

import type { LaunchNodeOptions } from './test-utils';
import { waitUntilUnreachable, launchNode } from './test-utils';

process.setMaxListeners(Infinity);

async function parseBody(req: http.IncomingMessage): Promise<LaunchNodeOptions> {
  return new Promise<LaunchNodeOptions>((resolve, reject) => {
    const body: Buffer[] = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body.length === 0 ? '{}' : Buffer.concat(body).toString()));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const cleanupFns: Map<string, () => Promise<void>> = new Map();

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/') {
    try {
      const body = await parseBody(req);

      const node = await launchNode({
        port: '0',
        loggingEnabled: false,
        ...body,
        fuelCorePath: 'fuels-core',
      });

      cleanupFns.set(node.url, async () => {
        node.cleanup();
        await waitUntilUnreachable(node.url);
        cleanupFns.delete(node.url);
      });

      res.end(node.url);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(err));
    }
    return;
  }

  if (req.url?.startsWith('/cleanup')) {
    const nodeUrl = req.url?.match(/\/cleanup\/(.+)/)?.[1];
    if (nodeUrl) {
      const cleanupFn = cleanupFns.get(nodeUrl);
      await cleanupFn?.();
      res.end();
    }
  }
});

const closeServer = (event?: string) => (reason?: unknown) => {
  console.log(event);
  if (reason) {
    console.log(reason);
  }
  return new Promise<void>((resolve) => {
    if (!server.listening) {
      resolve();
      return;
    }

    server.close(async () => {
      const cleanupCalls: Promise<void>[] = [];
      cleanupFns.forEach((fn) => cleanupCalls.push(fn()));
      await Promise.all(cleanupCalls);
      process.exit();
    });

    resolve();
  });
};

server.on('request', async (req, res) => {
  if (req.url === '/close-server') {
    await closeServer('request to /close-server')();
    res.end();
  }
});

const port = process.argv[2] ? parseInt(process.argv[2], 10) : 49342;

server.listen(port);

server.on('listening', () => {
  const usedPort = (server.address() as AddressInfo).port;
  const serverUrl = `http://localhost:${usedPort}`;
  console.log(serverUrl);
  console.log(`Server is listening on: ${serverUrl}`);
  console.log("To launch a new fuel-core node and get its url, make a POST request to '/'.");
  console.log(
    "To kill the node, make a POST request to '/cleanup/<url>' where <url> is the url of the node you want to kill."
  );
  console.log('All nodes will be killed when the server is closed.');
  console.log('You can close the server by sending a request to /close-server.');
});

process.on('exit', closeServer('exit'));
process.on('SIGINT', closeServer('SIGINT'));
process.on('SIGUSR1', closeServer('SIGUSR1'));
process.on('SIGUSR2', closeServer('SIGUSR2'));
process.on('uncaughtException', closeServer('uncaughtException'));
process.on('unhandledRejection', closeServer('unhandledRejection'));
process.on('beforeExit', closeServer('beforeExit'));
