import { mockLocalNetwork } from '../../test/importMocked';

/**
 * @group node
 */
test('it works', async () => {
  await mockLocalNetwork();
  const { main } = await import('./connecting-to-localnode.wrapped');
  const { balances } = await main();
  expect(balances).toBeTruthy();
  expect(balances).toBeInstanceOf(Array);
});
