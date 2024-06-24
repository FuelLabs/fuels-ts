import { Provider } from '@fuel-ts/account';
import { waitUntilUnreachable } from '@fuel-ts/utils/test-utils';
import { spawn } from 'node:child_process';

import { launchTestNode } from './test-utils';

interface ServerInfo extends Disposable {
  serverUrl: string;
  closeServer: () => Promise<void>;
}

function startServer(port: number = 0): Promise<ServerInfo> {
  return new Promise((resolve, reject) => {
    const cp = spawn(`pnpm tsx packages/fuels/src/setup-launch-node-server.ts ${port}`, {
      detached: true,
      shell: 'sh',
    });

    const server = {
      killed: false,
      url: undefined as string | undefined,
    };

    const closeServer = async () => {
      if (server.killed) {
        return;
      }
      server.killed = true;
      await fetch(`${server.url}/close-server`);
    };

    cp.stderr?.on('data', (chunk) => {
      // eslint-disable-next-line no-console
      console.log(chunk.toString());
    });

    cp.stdout?.on('data', (chunk) => {
      // first message is server url and we resolve immediately because that's what we care about
      const message: string[] = chunk.toString().split('\n');
      const serverUrl = message[0];
      server.url ??= serverUrl;
      resolve({
        serverUrl,
        closeServer,
        [Symbol.dispose]: closeServer,
      });
    });

    cp.on('error', async (err) => {
      await closeServer();
      reject(err);
    });

    cp.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Server process exited with code ${code}`));
      }
    });

    process.on('SIGINT', closeServer);
    process.on('SIGUSR1', closeServer);
    process.on('SIGUSR2', closeServer);
    process.on('uncaughtException', closeServer);
    process.on('unhandledRejection', closeServer);
    process.on('beforeExit', closeServer);
  });
}

/**
 * @group node
 */
describe(
  'setup-launch-node-server',
  () => {
    test('can start server on specific port', async () => {
      using launched = await startServer(9876);
      expect(launched.serverUrl).toEqual('http://localhost:9876');
    });

    test('the /close-server endpoint closes the server', async () => {
      const { serverUrl } = await startServer();
      await fetch(`${serverUrl}/close-server`);

      await waitUntilUnreachable(serverUrl);
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
      const { serverUrl, closeServer: killServer } = await startServer();
      const url1 = await (await fetch(serverUrl)).text();
      const url2 = await (await fetch(serverUrl)).text();

      await killServer();

      // if the nodes remained live then the test would time out
      await waitUntilUnreachable(url1);
      await waitUntilUnreachable(url2);
    });

    test('launchTestNode launches and kills node ', async () => {
      using launchedServer = await startServer();
      const port = launchedServer.serverUrl.split(':')[2];
      const { cleanup, provider } = await launchTestNode({
        launchNodeServerPort: port,
      });

      cleanup();

      await waitUntilUnreachable(provider.url);
    });
  },
  { timeout: 25000 }
);
