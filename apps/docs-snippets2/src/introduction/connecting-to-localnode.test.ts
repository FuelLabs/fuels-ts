import { mockLocalNetworkWithTestNode } from '../../test/importMocked';

/**
 * @group node
 */
test('it works', async () => {
  const { provider } = await mockLocalNetworkWithTestNode();
  const { main } = await import('./connecting-to-localnode.wrapped');
  const { providerUrl, balances } = await main();

  expect(providerUrl).toEqual(provider.url);
  expect(balances).toBeTruthy();
  expect(balances).toBeInstanceOf(Array);
});
