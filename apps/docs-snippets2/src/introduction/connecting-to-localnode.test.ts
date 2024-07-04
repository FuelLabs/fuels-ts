import { launchTestNode } from 'fuels/test-utils';

import { main } from './connecting-to-testnet.wrapped';

/**
 * @group node
 */
test('it works', async () => {
  const { provider } = await launchTestNode();
  const { balances } = await main(provider.url);
  expect(balances).toBeTruthy();
  expect(balances).toBeInstanceOf(Array);
});
