import { launchTestNode } from 'fuels/test-utils';

import { CounterFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
test('isReadOnly returns true for read-only functions', async () => {
  using launched = await launchTestNode({
    contractsConfigs: [
      {
        factory: CounterFactory,
      },
    ],
  });

  const {
    contracts: [contract],
  } = launched;

  // #region is-function-readonly-1

  const isReadOnly = contract.functions.get_count.isReadOnly();

  if (isReadOnly) {
    await contract.functions.get_count().get();
  } else {
    const { waitForResult } = await contract.functions.get_count().call();
    await waitForResult();
  }
  // #endregion is-function-readonly-1

  expect(isReadOnly).toBe(true);
});
