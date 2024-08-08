import { launchTestNode } from 'fuels/test-utils';
import { describe, test, expect } from 'vitest';

import { CounterFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Counter Contract', () => {
  // #region decrement-counter
  // #context import { Counter } from './sway-programs-api';

  test('calls the decrement_counter function', async () => {
    // First, we'll launch a test node, passing the contract factory and bytecode. This will deploy the contract
    // to our test node so we can test against it.
    using launched = await launchTestNode({
      // The test node will be killed automatically once the `launched` variable goes out of scope,
      // because we are instantiating it with the `using` keyword.
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    // We can now destructure the contract from the launched object.
    const {
      contracts: [contract],
    } = launched;

    // Lets setup some values to use in the test.
    const initialCount = 0;
    const incrementedValue = 5;
    const decrementedValue = 2;

    // We can now call the contract functions and test the results. Lets assert the initial value of the counter.
    const { waitForResult: initWaitForResult } = await contract.functions.get_count().call();
    const { value: initValue } = await initWaitForResult();
    expect(initValue.toNumber()).toBe(initialCount);

    // Next we'll increment the counter, so that we can decrement it.
    const { waitForResult: incWaitForResult } = await contract.functions
      .increment_counter(5)
      .call();
    const { value: incValue } = await incWaitForResult();
    expect(incValue.toNumber()).toBe(incrementedValue);

    // Next, we'll decrement the counter by 3 and assert the new value.
    const { waitForResult: decWaitForResult } = await contract.functions
      .decrement_counter(3)
      .call();
    const { value: decValue } = await decWaitForResult();
    expect(decValue.toNumber()).toBe(decrementedValue);

    // Finally, we'll test the get count function again to ensure parity.
    const { waitForResult: finalWaitForResult } = await contract.functions.get_count().call();
    const { value: finalValue } = await finalWaitForResult();
    expect(finalValue.toNumber()).toBe(decrementedValue);
  });
  // #endregion decrement-counter
});
