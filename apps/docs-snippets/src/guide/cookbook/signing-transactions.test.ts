import type { Provider, BN, JsonAbi } from 'fuels';
import { WalletUnlocked, Predicate, Script, ScriptTransactionRequest } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Signing transactions', () => {
  let bytecode: string;
  let abi: JsonAbi;
  let sender: WalletUnlocked;
  let receiver: WalletUnlocked;
  let signer: WalletUnlocked;
  let provider: Provider;
  let baseAssetId: string;
  const { abiContents: abiPredicate, binHexlified: binPredicate } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.PREDICATE_SIGNING
  );
  const { abiContents: abiScript, binHexlified: binScript } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SCRIPT_SIGNING
  );

  beforeAll(async () => {
    sender = await getTestWallet();
    signer = WalletUnlocked.generate({
      provider: sender.provider,
    });

    provider = sender.provider;
    baseAssetId = provider.getBaseAssetId();
  });

  beforeEach(() => {
    receiver = WalletUnlocked.generate({
      provider: sender.provider,
    });
  });

  it('creates a transfer with external signer [script]', async () => {
    const amountToReceiver = 100;
    bytecode = binScript;
    abi = abiScript;

    // #region multiple-signers-2
    // #import { Script };

    const script = new Script(bytecode, abi, sender);
    const { waitForResult } = await script.functions
      .main(signer.address.toB256())
      .addTransfer({
        destination: receiver.address,
        amount: amountToReceiver,
        assetId: baseAssetId,
      })
      .addSigners(signer)
      .call<BN>();

    const { value } = await waitForResult();
    // #endregion multiple-signers-2

    expect(value).toBe(true);
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });

  it('creates a transfer with external signer [predicate]', async () => {
    const amountToReceiver = 100;
    bytecode = binPredicate;
    abi = abiPredicate;

    // #region multiple-signers-4
    // #import { Predicate, ScriptTransactionRequest };

    // Create and fund the predicate
    const predicate = new Predicate<[string]>({
      bytecode,
      abi,
      provider,
      inputData: [signer.address.toB256()],
    });
    const tx1 = await sender.transfer(predicate.address, 200_000, baseAssetId);
    await tx1.waitForResult();

    // Create the transaction request
    const request = new ScriptTransactionRequest();
    request.addCoinOutput(receiver.address, amountToReceiver, baseAssetId);

    // Get the predicate resources and add them and predicate data to the request
    const resources = await predicate.getResourcesToSpend([
      {
        assetId: baseAssetId,
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
