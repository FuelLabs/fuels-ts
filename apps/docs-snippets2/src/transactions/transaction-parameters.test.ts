import { main } from './transaction-parameters.wrapped';

/**
 * @group node
 */
test('it works', async () => {
  const [[{ isStatusSuccess }]] = await main();
  expect(isStatusSuccess).toBeTruthy();
});
