import { launchTestNode } from 'fuels/test-utils';

import { describe, test, expect } from 'vitest';

/**
 * Imports for the contract factory and bytecode, so that we can use them in the test.
 *
 * Can't find these imports? Make sure you've run `fuels build` to generate these with typegen.
 */
import { TestContractFactory } from '../../src/sway-api';

/**
 * Contract Testing
 * 
 *
 * Tests for the contract program type within the TS SDK. Here we will test the deployment of
 * our contract, and the result of call it's functions.
 */
describe('Contract', () => {
  test('Deploy and Call', async () => {
    // First, we'll launch a test node, passing the contract factory and bytecode. This will deploy the contract
    // to our test node so we can test against it.
    using launched = await launchTestNode({
      // The test node will be killed automatically once the `launched` variable goes out of scope,
      // because we are instantiating it with the `using` keyword.
      contractsConfigs: [
        {
          factory: TestContractFactory,
        },
      ],
    });

    // We can now destructure the contract from the launched object.
    const {
      contracts: [contract],
    } = launched;

    // Lets setup some values to use in the test.
    const initialCount = 0;
    const incrementedCount = 5;

    // We can now call the contract functions and test the results. Lets assert the initial value of the counter.
    const { waitForResult: initWaitForResult } = await contract.functions.get_count().call();
    const { value: initValue } = await initWaitForResult();
    expect(initValue.toNumber()).toBe(initialCount);

    // Next, we'll increment the counter by 5 and assert the new value.
    const { waitForResult: incrementWaitForResult } = await contract.functions
      .increment_counter(incrementedCount)
      .call();
    const { value: incrementValue } = await incrementWaitForResult();
    expect(incrementValue.toNumber()).toBe(incrementedCount);

    // Finally, we'll test the get count function again to ensure parity.
    const { waitForResult: finalWaitForResult } = await contract.functions.get_count().call();
    const { value: finalValue } = await finalWaitForResult();
    expect(finalValue.toNumber()).toBe(incrementedCount);
    expect(initValue.toNumber()).toBeLessThan(finalValue.toNumber());
  });
});
