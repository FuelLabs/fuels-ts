import {
  ErrorCode,
  FuelError,
  hexlify,
  ScriptTransactionRequest,
  TransactionResponse,
  Wallet,
  WalletUnlocked,
} from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { PredicateFalse } from '../test/typegen';
import { CollisionInFnNamesFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Edge Cases', () => {
  it('can run collision_in_fn_names', async () => {
    using contractInstance = await launchTestContract({
      factory: CollisionInFnNamesFactory,
    });

    const { waitForResult } = await contractInstance.functions.new().call();
    const { value } = await waitForResult();

    expect(value.toNumber()).toEqual(12345);
  });

  test("SSE subscriptions that are closed by the node don't hang a for-await-of loop", async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [adminWallet],
    } = launched;

    const baseAssetId = provider.getBaseAssetId();

    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      baseAssetId,
      { gasLimit: 10_000 }
    );

    const response = new TransactionResponse(transactionId, provider);

    await response.waitForResult();

    const subsciption = await provider.operations.statusChange({ transactionId });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const iterator of subsciption) {
      // we leave this intentionally empty so that we test that the subscription will end the loop when the connection is closed
    }
  });

  test('Submitting a failing transaction via submitAndAwaitStatus subscription throws immediately', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [funder],
    } = launched;

    const predicate = new PredicateFalse({ provider: launched.provider });
    await funder.transfer(predicate.address, 1_000_000);

    const transferTx = await predicate.createTransfer(WalletUnlocked.generate().address, 1);

    await expectToThrowFuelError(
      () =>
        launched.provider.operations.submitAndAwaitStatus({
          encodedTransaction: hexlify(transferTx.toTransactionBytes()),
        }),
      new FuelError(
        ErrorCode.INVALID_REQUEST,
        'Invalid transaction data: PredicateVerificationFailed(Panic(PredicateReturnedNonOne))'
      )
    );
  });
});
