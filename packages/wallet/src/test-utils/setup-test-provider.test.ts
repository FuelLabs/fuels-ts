import { safeExec } from '@fuel-ts/errors/test-utils';
import { Provider } from '@fuel-ts/providers';

import { setupTestProvider } from './setup-test-provider';

describe('launchTestProvider', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';
    // eslint-disable-next-line no-lone-blocks
    {
      await using p = await setupTestProvider();
      url = p.url;
      await p.getBlockNumber();
    }

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    const expectedError = {
      message: 'fetch failed',
    };

    expect(error).toMatchObject(expectedError);
  });
});
