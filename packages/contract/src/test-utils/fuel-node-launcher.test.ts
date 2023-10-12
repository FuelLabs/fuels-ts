import { safeExec } from '@fuel-ts/errors/test-utils';
import { Provider } from '@fuel-ts/providers';

import { TestNodeLauncher } from './fuel-node-launcher';

describe('TestNodeLauncher', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';

    {
      await using launched = await TestNodeLauncher.launch();

      const { provider } = launched;

      url = provider.url;
      await provider.getBlockNumber();
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
