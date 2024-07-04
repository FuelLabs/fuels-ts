import { mockProviderForLocalNetwork } from '../../test/mockProviderForLocalNetwork';

/**
 * @group node
 */
test('it works', async () => {
  const { provider } = await mockProviderForLocalNetwork();
  const { main } = await import('./connecting-to-localnode.wrapped');
  const { providerUrl, balances } = await main();

  expect(providerUrl).toEqual(provider.url); // TODO: remove check after PoC
  expect(balances).toBeTruthy();
  expect(balances).toBeInstanceOf(Array);
});
