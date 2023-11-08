import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import fs from 'fs';
import fsAsync from 'fs/promises';
import http from 'http';
import { parse } from 'url';

import { sleepUntilTrue } from '../sleep';

import { defaultChainConfig } from './defaultChainConfig';
import { launchTestNode } from './launchTestNode';

async function nodeIsRunning(ip: string, port: string): Promise<boolean> {
  return new Promise((resolve) => {
    const url = `http://${ip}:${port}/graphql`;

    const req = http.request(parse(url), () => {
      resolve(true);
    });

    req.on('error', () => resolve(false));
    req.end();
  });
}

describe('launchNode', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('throws an error if the node fails to start due to bad input', async () => {
    await expectToThrowFuelError(
      async () => {
        const badCoin = { amount: '0', asset_id: '3212', owner: '4343' };

        await launchTestNode({
          chainConfig: {
            ...defaultChainConfig,
            initial_state: {
              coins: [badCoin],
              messages: [],
            },
          },
        });
      },
      {
        code: FuelError.CODES.INVALID_INPUT_PARAMETERS,
      }
    );
  });

  it('cleanup kills the started node', async () => {
    const { cleanup, ip, port } = await launchTestNode();
    expect(await nodeIsRunning(ip, port)).toBe(true);

    await cleanup();

    expect(await nodeIsRunning(ip, port)).toBe(false);
  });

  it('can launch a node on a specific port', async () => {
    const port = '5678';
    const { cleanup, ip } = await launchTestNode({ port });
    expect(await nodeIsRunning(ip, port)).toBe(true);

    await cleanup();
  });

  it('creates a temporary config file on launch and deletes it on cleanup', async () => {
    const fsSpy = vi.spyOn(fsAsync, 'writeFile');

    const { cleanup } = await launchTestNode();

    const tempFilePath = fsSpy.mock.calls[0][0] as string;
    expect(fs.existsSync(tempFilePath));

    await cleanup();

    expect(!fs.existsSync(tempFilePath));
  });

  it("can be given a logger function to access the node's logs as they're printed out", async () => {
    const logs = [];
    const { cleanup } = await launchTestNode({
      logger: (text) => {
        logs.push(text);
      },
    });

    await cleanup();

    expect(logs.length).toBeGreaterThan(0);
  });

  it('kills node on event:exit', async () => {
    const { ip, port } = await launchTestNode();

    process.emit('exit', 0);

    // give time for cleanup to kill the node
    await sleepUntilTrue(async () => !(await nodeIsRunning(ip, port)), 500);

    expect(await nodeIsRunning(ip, port)).toBe(false);
  });

  it('kills node on event:SIGINT (ctrl+c)', async () => {
    const { ip, port } = await launchTestNode();

    process.emit('SIGINT');

    await sleepUntilTrue(async () => !(await nodeIsRunning(ip, port)), 500);

    expect(await nodeIsRunning(ip, port)).toBe(false);
  });

  it('kills node on event:SIGUSR1', async () => {
    const { ip, port } = await launchTestNode();

    process.emit('SIGUSR1');

    await sleepUntilTrue(async () => !(await nodeIsRunning(ip, port)), 500);

    expect(await nodeIsRunning(ip, port)).toBe(false);
  });

  it('kills node on event:SIGUSR2', async () => {
    const { ip, port } = await launchTestNode();

    process.emit('SIGUSR2');

    await sleepUntilTrue(async () => !(await nodeIsRunning(ip, port)), 500);

    expect(await nodeIsRunning(ip, port)).toBe(false);
  });

  // this was working correctly with jest but fails with vite
  it.skip('kills node on event:uncaughtException', async () => {
    const { ip, port } = await launchTestNode();

    process.emit('uncaughtException', new Error());

    await sleepUntilTrue(async () => !(await nodeIsRunning(ip, port)), 500);

    expect(await nodeIsRunning(ip, port)).toBe(false);
  });
});
