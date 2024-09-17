import { launchTestNode } from 'fuels/test-utils';

import { describe, test, expect } from 'vitest';

/**
 * Import for the predicate factory and input data type, so that we can use them in the test.
 *
 * Can't find these imports? Make sure you've run `fuels build` to generate these with typegen.
 */
import { TestPredicate, TestPredicateInputs } from '../../src/sway-api/predicates/TestPredicate';

/**
 * Predicate Testing
 * 
 *
 * Tests for the predicate program type within the TS SDK. Here we will test the use of our predicate
 * in a transaction.
 */
describe('Predicate', () => {
  test('Transaction', async () => {
    // First, we'll launch a test node to use for our predicate transaction.
    using launched = await launchTestNode();
    // The test node will be killed automatically once the `launched` variable goes out of scope,
    // because we are instantiating it with the `using` keyword.

    // We can now destructure the provider and the sender and receiver wallet from the launched object.
    const {
      wallets: [sender, receiver],
      provider,
    } = launched;

    // For a predicate, we need to pass in an argument to evaluate the predicate.
    const predicateData: TestPredicateInputs = [1337];

    // Now, we can instantiate our predicate.
    const predicate = new TestPredicate({
      provider,
      data: predicateData,
    });

    // Lets also setup some transfer values to assert against.
    const amountToPredicate = 250_000;
    const amountToReceiver = 50_000;

    // Lets also get the initial balance of the receiver wallet to assert against.
    const initialReceiverBalance = await receiver.getBalance();

    // We can now transfer some assets to the predicate.
    const setupTx = await sender.transfer(predicate.address, amountToPredicate);
    await setupTx.waitForResult();

    // And we'll assert it's value to confirm success of the transfer.
    const predicateBalance = await predicate.getBalance();
    expect(predicateBalance.toNumber()).toBe(amountToPredicate);

    // Now we can transfer assets from the predicate to the receiver.
    const tx = await predicate.transfer(receiver.address, amountToReceiver);
    const { isStatusSuccess } = await tx.waitForResult();
    expect(isStatusSuccess).toBe(true);

    // Then get our receivers final balance.
    const finalReceiverBalance = await receiver.getBalance();

    // And lastly we'll assert all the values to confirm the success of the predicate transfer.
    expect(finalReceiverBalance.toNumber()).toBe(
      initialReceiverBalance.add(amountToReceiver).toNumber()
    );
  });
});
