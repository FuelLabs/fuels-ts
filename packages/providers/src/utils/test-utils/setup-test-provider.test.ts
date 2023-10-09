import { safeExec } from '@fuel-ts/errors/test-utils';

import { Provider, sleep } from '../..';

import { setupTestProvider } from './setup-test-provider';

describe('launchTestProvider', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';
    // eslint-disable-next-line no-lone-blocks
    {
      using p = await setupTestProvider();
      url = p.url;
      await p.getBlockNumber();
    }

    // wait for OS to kill node
    await sleep(1000);

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    const ipAndPort = url.replace('http://', '').replace('/graphql', '');
    const [ip, port] = ipAndPort.split(':');

    const expectedError = {
      message: 'fetch failed',
      cause: {
        syscall: 'connect',
        errno: -111,
        code: 'ECONNREFUSED',
        address: ip,
        port: parseInt(port, 10),
      },
    };
    expect(error).toMatchObject(expectedError);
  });
});
