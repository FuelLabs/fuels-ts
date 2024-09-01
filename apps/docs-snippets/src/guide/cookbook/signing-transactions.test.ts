import type { BN } from 'fuels';
import { Predicate, Script, ScriptTransactionRequest, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptSigning } from '../../../test/typegen';
import { PredicateSigning } from '../../../test/typegen/predicates';

/**
 * @group node
 * @group browser
 */
describe('Signing transactions', () => {
  it('creates a transfer with external signer [script]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [sender],
    } = launched;
    const amountToReceiver = 100;

    const signer = Wallet.generate({
      provider,
    });

    const receiver = Wallet.generate({
      provider,
    });
    // #region multiple-signers-2
    // #import { Script };

    const script = new Script(ScriptSigning.bytecode, ScriptSigning.abi, sender);
    const { waitForResult } = await script.functions
      .main(signer.address.toB256())
      .addTransfer({
        destination: receiver.address,
        amount: amountToReceiver,
        assetId: provider.getBaseAssetId(),
      })
      .addSigners(signer)
      .call<BN>();

    const { value } = await waitForResult();
    // #endregion multiple-signers-2

    expect(value).toBe(true);
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });

  it('creates a transfer with external signer [predicate]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [sender],
    } = launched;
    const amountToReceiver = 100;

    const signer = Wallet.generate({
      provider,
    });

    const receiver = Wallet.generate({
      provider,
    });

    // #region multiple-signers-4
    // #import { Predicate, ScriptTransactionRequest };

    // Create and fund the predicate
    const predicate = new Predicate<[string]>({
      bytecode: PredicateSigning.bytecode,
      abi: PredicateSigning.abi,
      provider,
      data: [signer.address.toB256()],
    });
    const tx1 = await sender.transfer(predicate.address, 200_000, provider.getBaseAssetId());
    await tx1.waitForResult();

    // Create the transaction request
    const request = new ScriptTransactionRequest();
    request.addCoinOutput(receiver.address, amountToReceiver, provider.getBaseAssetId());

    // Get the predicate resources and add them and predicate data to the request
    const resources = await predicate.getResourcesToSpend([
      {
        assetId: provider.getBaseAssetId(),
        amount: amountToReceiver,
      },
    ]);

    request.addResources(resources);
    request.addWitness('0x');

    // Add witnesses including the signer
    // Estimate the predicate inputs
    const txCost = await predicate.getTransactionCost(request, {
      signatureCallback: (tx) => tx.addAccountWitnesses(signer),
    });

    request.updatePredicateGasUsed(txCost.estimatedPredicates);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await predicate.fund(request, txCost);

    await request.addAccountWitnesses(signer);

    // Send the transaction
    const res = await provider.sendTransaction(request);
    await res.waitForResult();

    // #endregion multiple-signers-4
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });
});
