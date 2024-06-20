/* eslint-disable no-console */
import type { LaunchNodeOptions, LaunchNodeResult } from '@fuel-ts/account/test-utils';
import { launchNode } from '@fuel-ts/account/test-utils';
import http from 'http';
import type { AddressInfo } from 'net';

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

const cleanupFns: Map<string, Awaited<LaunchNodeResult>['cleanup']> = new Map();

function cleanupAllNodes() {
  cleanupFns.forEach((fn) => fn());
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/') {
    try {
      const body = await parseBody(req);

      const node = await launchNode({
        port: '0',
        ...body,
        fuelCorePath: 'fuels-core',
      });
      cleanupFns.set(node.url, () => {
        node.cleanup();
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
      cleanupFn?.();
      res.end();
    }
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
  console.log('All nodes will be killed when the server is killed.');
});

server.on('close', () => {
  console.log('close');
  cleanupAllNodes();
});

process.on('exit', () => {
  console.log('exit');
  cleanupAllNodes();
});
process.on('SIGINT', () => {
  console.log('sigint');
  cleanupAllNodes();
});
process.on('SIGUSR1', () => {
  console.log('SIGUSR1');
  cleanupAllNodes();
});
process.on('SIGUSR2', () => {
  console.log('SIGUSR2');
  cleanupAllNodes();
});
process.on('uncaughtException', (e) => {
  console.log('uncaughtException');
  console.log(e);
  cleanupAllNodes();
});
process.on('unhandledRejection', (reason) => {
  console.log('unhandledRejection');
  console.log(reason);

  cleanupAllNodes();
});
process.on('beforeExit', () => {
  console.log('beforeExit');
  cleanupAllNodes();
});
