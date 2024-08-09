import { main } from './connecting-to-testnet.wrapped';

/**
 * @group node
 */
test('it works', async () => {
  const [[{ balances }]] = await main();
  expect(balances).toBeInstanceOf(Array);
});
