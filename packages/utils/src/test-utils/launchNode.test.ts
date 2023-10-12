import fs from 'fs';
import fsAsync from 'fs/promises';
import http from 'http';
import { parse } from 'url';

import { launchNode } from './launchNode';

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

async function urlExists(url: string) {
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      ...parse(url),
    };

    const req = http.request(options, () => {
      resolve(true);
    });

    req.on('error', () => resolve(false));
    req.end();
  });
}

describe('launchNode', () => {
  afterAll(() => jest.clearAllMocks());

  it('cleanup kills the started node', async () => {
    const { cleanup, ip, port } = await launchNode();
    const url = `http://${ip}:${port}/graphql`;
    expect(await urlExists(url)).toBe(true);

    await cleanup();

    expect(await urlExists(url)).toBe(false);
  });

  it('creates a temporary config file on launch and deletes it on cleanup', async () => {
    const fsSpy = jest.spyOn(fsAsync, 'writeFile');

    const { cleanup } = await launchNode();

    const tempFilePath = fsSpy.mock.calls[0][0] as string;
    expect(fs.existsSync(tempFilePath));

    await cleanup();

    expect(!fs.existsSync(tempFilePath));
  });

  it('kills node on event:exit', async () => {
    const { ip, port } = await launchNode();
    const url = `http://${ip}:${port}/graphql`;

    process.emit('exit', 0);

    // give time for cleanup to kill the node
    await sleep(1500);

    expect(await urlExists(url)).toBe(false);
  });

  it('kills node on event:SIGINT (ctrl+c)', async () => {
    const { ip, port } = await launchNode();
    const url = `http://${ip}:${port}/graphql`;

    process.emit('SIGINT');

    // give time for cleanup to kill the node
    await sleep(1500);

    expect(await urlExists(url)).toBe(false);
  });

  it('kills node on event:SIGUSR1', async () => {
    const { ip, port } = await launchNode();
    const url = `http://${ip}:${port}/graphql`;

    process.emit('SIGUSR1');

    // give time for cleanup to kill the node
    await sleep(1500);

    expect(await urlExists(url)).toBe(false);
  });

  it('kills node on event:SIGUSR2', async () => {
    const { ip, port } = await launchNode();
    const url = `http://${ip}:${port}/graphql`;

    process.emit('SIGUSR2');

    // give time for cleanup to kill the node
    await sleep(1500);

    expect(await urlExists(url)).toBe(false);
  });

  it('kills node on event:uncaughtException', async () => {
    const { ip, port } = await launchNode();
    const url = `http://${ip}:${port}/graphql`;

    process.emit('uncaughtException', new Error());

    // give time for cleanup to kill the node
    await sleep(1500);

    expect(await urlExists(url)).toBe(false);
  });
});
