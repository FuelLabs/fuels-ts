import { safeExec } from '@fuel-ts/errors/test-utils';

import Provider from '../../provider';
import { sleep } from '../sleep';

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

    expect(error).toEqual({
      message: `request to ${url} failed, reason: connect ECONNREFUSED ${ipAndPort}`,
      type: 'system',
      errno: 'ECONNREFUSED',
      code: 'ECONNREFUSED',
    });
  });
});
