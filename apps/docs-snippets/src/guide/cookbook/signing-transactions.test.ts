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
  let gasPrice: BN;
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
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
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
    const { value } = await script.functions
      .main(signer.address.toB256())
      .addTransfer(receiver.address, amountToReceiver, baseAssetId)
      .addSigners(signer)
      .call<BN>();
    // #endregion multiple-signers-2

    expect(value.toNumber()).toEqual(1);
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
    await sender.transfer(predicate.address, 10_000, baseAssetId);

    // Create the transaction request
    const request = new ScriptTransactionRequest({ gasPrice, gasLimit: 10_000 });
    request.addCoinOutput(receiver.address, amountToReceiver, baseAssetId);

    // Get the predicate resources and add them and predicate data to the request
    const resources = await predicate.getResourcesToSpend([
      {
        assetId: baseAssetId,
        amount: amountToReceiver,
      },
    ]);
    request.addPredicateResources(resources, predicate);
    const parsedRequest = predicate.populateTransactionPredicateData(request);

    // Add witnesses including the signer
    parsedRequest.addWitness('0x');
    await parsedRequest.addAccountWitnesses(signer);

    // Estimate the predicate inputs
    const { estimatedInputs } = await provider.getTransactionCost(parsedRequest);
    parsedRequest.updatePredicateInputs(estimatedInputs);

    // Send the transaction
    const res = await provider.sendTransaction(parsedRequest);
    await res.waitForResult();

    // #endregion multiple-signers-4
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });
});
