import { launchTestNode } from 'fuels/test-utils';

import { describe, test, expect } from 'vitest';

/**
 * Import for the script factory, so that we can use them in the test.
 *
 * Can't find these imports? Make sure you've run `fuels build` to generate these with typegen.
 */
import { TestScript } from '../../src/sway-api';

/**
 * Script Testing
 * 
 *
 * Tests for the script program type within the TS SDK. Here we will test the use of our script
 * function call.
 */
describe('Script', () => {
  test('Call', async () => {
    // First, we'll launch a test node to use for our script transaction.
    using launched = await launchTestNode();
    // The test node will be killed automatically once the `launched` variable goes out of scope,
    // because we are instantiating it with the `using` keyword.

    // We can now destructure the sender wallet from the launched object.
    const {
      wallets: [sender],
    } = launched;

    // Now, we can instantiate our script.
    const script = new TestScript(sender);

    // Lets also setup a value to use in the test.
    const expectedValue = 1337;

    // We can now call the script function and assert the result.
    const { waitForResult } = await script.functions.main(expectedValue).call();
    const { value } = await waitForResult();
    expect(value.toNumber()).toBe(expectedValue);
  });
});
