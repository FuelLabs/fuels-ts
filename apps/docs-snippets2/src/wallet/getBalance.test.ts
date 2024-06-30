import { main } from './getBalance.wrapped';

test('Has balance', async () => {
  const { balances } = await main();
  expect(balances).toBeTruthy();
});
