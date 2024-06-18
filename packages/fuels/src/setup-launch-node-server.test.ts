import { Provider } from '@fuel-ts/account';
import { waitUntilUnreachable } from '@fuel-ts/utils/test-utils';
import { spawn } from 'node:child_process';

function startServer(
  port: number = 0
): Promise<{ serverUrl: string; killServer: () => void } & Disposable> {
  return new Promise((resolve, reject) => {
    const cp = spawn(`pnpm tsx packages/fuels/src/setup-launch-node-server.ts ${port}`, {
      detached: true,
      shell: 'sh',
    });

    const killServer = () => {
      // https://github.com/nodejs/node/issues/2098#issuecomment-169549789
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.kill(-cp.pid!);
    };

    cp.stdout?.on('data', (chunk) => {
      // first message is server url
      const message: string[] = chunk.toString().split('\n');
      const serverUrl = message[0].startsWith('http://') ? message[0] : '';
      // teardown
      resolve({
        serverUrl,
        killServer,
        [Symbol.dispose]: killServer,
      });
    });

    cp.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * @group node
 */
describe('setup-launch-node-server', () => {
  test('can start server on specific port', async () => {
    using launched = await startServer(9876);
    expect(launched.serverUrl).toEqual('http://localhost:9876');
  });

  test('returns a valid fuel-core node url on request', async () => {
    using launched = await startServer();

    const url = await (await fetch(launched.serverUrl)).text();
    // fetches node-related data
    // would fail if fuel-core node is not running on url
    await Provider.create(url);
  });

  test('the /cleanup endpoint kills the node', async () => {
    using launched = await startServer();
    const url = await (await fetch(launched.serverUrl)).text();

    await fetch(`${launched.serverUrl}/cleanup/${url}`);

    // if the node remained live then the test would time out
    await waitUntilUnreachable(url);
  });

  test('kills all nodes when the server is shut down', async () => {
    const { serverUrl, killServer } = await startServer();
    const url1 = await (await fetch(serverUrl)).text();
    const url2 = await (await fetch(serverUrl)).text();

    killServer();

    // if the nodes remained live then the test would time out
    await waitUntilUnreachable(url1);
    await waitUntilUnreachable(url2);
  });
});
