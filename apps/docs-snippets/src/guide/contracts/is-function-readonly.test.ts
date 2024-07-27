import { launchTestNode } from 'fuels/test-utils';

import { CounterAbi__factory } from '../../../test/typegen';
import CounterAbiHex from '../../../test/typegen/contracts/CounterAbi.hex';

/**
 * @group node
 * @group browser
 */
test('isReadOnly returns true for read-only functions', async () => {
  using launched = await launchTestNode({
    contractsConfigs: [
      {
        deployer: CounterAbi__factory,
        bytecode: CounterAbiHex,
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
