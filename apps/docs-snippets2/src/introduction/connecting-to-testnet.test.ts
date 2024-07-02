import { main } from './connecting-to-testnet.wrapped';

/**
 * @group node
 * @group browser
 */
test('it works', async () => {
  const { balances } = await main();
  expect(balances).toBeTruthy();
  expect(balances).toBeInstanceOf(Array);
});
