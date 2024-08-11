import { bn, Predicate, Wallet, Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateStdLibString, ScriptStdLibString, StdLibStringFactory } from '../test/typegen';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */

function setupContract() {
  return launchTestContract({
    factory: StdLibStringFactory,
  });
}

describe('std-lib-string Tests', () => {
  it('should test std-lib-string return', async () => {
    using contractInstance = await setupContract();
    const { waitForResult } = await contractInstance.functions
      .return_dynamic_string()
      .call<string>();

    const { value } = await waitForResult();
    expect(value).toBe('Hello World');
  });

  it('should test std-lib-string input', async () => {
    using contractInstance = await setupContract();
    const INPUT = 'Hello World';

    const { waitForResult } = await contractInstance.functions.accepts_dynamic_string(INPUT).call();
    const { value } = await waitForResult();

    expect(value).toBeUndefined();
  });

  it('should test String input [predicate-std-lib-string]', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.fromAddress(Address.fromRandom(), provider);

    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    type MainArgs = [number, number, string];
    const predicate = new Predicate<MainArgs>({
      abi: PredicateStdLibString.abi,
      bytecode: PredicateStdLibString.bytecode,
      provider,
      data: [1, 2, 'Hello World'],
    });

    // setup predicate
    const setupTx = await wallet.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();
    const tx = await predicate.transfer(
      receiver.address,
      amountToReceiver,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    const { isStatusSuccess } = await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );

    expect(isStatusSuccess);
  });

  it('should test String input [script-std-lib-string]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const INPUT = 'Hello World';
    const scriptInstance = new ScriptStdLibString(wallet);

    const { waitForResult } = await scriptInstance.functions.main(INPUT).call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });
});
