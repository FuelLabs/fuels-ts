import { main } from './getBalance.wrapped';

test('Has balance', async () => {
  const [{ balance }] = await main();
  expect(balance).toBeTruthy();
});
