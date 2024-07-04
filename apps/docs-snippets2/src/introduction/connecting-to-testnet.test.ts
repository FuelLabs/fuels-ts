import { TESTNET_NETWORK_URL } from 'fuels';

import { mockProviderForLocalNetwork } from '../../test/mockProviderForLocalNetwork';

import { main } from './connecting-to-testnet.wrapped';

/**
 * @group node
 */
test('it works', async () => {
  const { provider } = await mockProviderForLocalNetwork();
  const { providerUrl, balances } = await main();
  expect(providerUrl).toEqual(TESTNET_NETWORK_URL); // TODO: remove check after PoC
  expect(providerUrl).not.toEqual(provider.url); // TODO: remove check after PoC
  expect(balances).toBeTruthy();
  expect(balances).toBeInstanceOf(Array);
});
