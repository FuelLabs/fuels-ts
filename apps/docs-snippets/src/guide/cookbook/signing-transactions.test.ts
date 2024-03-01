import { sign } from 'crypto';
import type { Provider, BN } from 'fuels';
import {
  WalletUnlocked,
  Predicate,
  BaseAssetId,
  Script,
  FunctionInvocationResult,
  ScriptTransactionRequest,
} from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Signing transactions', () => {
  let sender: WalletUnlocked;
  let receiver: WalletUnlocked;
  let signer: WalletUnlocked;
  let provider: Provider;
  let gasPrice: BN;
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
  });

  beforeEach(() => {
    receiver = WalletUnlocked.generate({
      provider: sender.provider,
    });
  });

  it('creates a transfer with external signer [script]', async () => {
    const amountToReceiver = 100;

    // #region multiple-signers-2
    // #import { Script, BaseAssetId };

    // Create invocation scope
    const script = new Script(binScript, abiScript, sender);
    const scope = script.functions
      .main(signer.address.toB256())
      .txParams({ gasPrice, gasLimit: 1_000_000 });
    await scope.fundWithRequiredCoins();

    // Create the transaction request
    const transactionRequest = await scope.getTransactionRequest();
    transactionRequest.addCoinOutput(receiver.address, amountToReceiver, BaseAssetId);

    // Sign the transaction
    await transactionRequest.addSigner(signer);

    // Send the transaction
    const response = await sender.sendTransaction(transactionRequest);
    await response.waitForResult();
    // #endregion multiple-signers-2

    const { value } = await FunctionInvocationResult.build<BN>([scope], response, false, script);

    expect(value.toNumber()).toEqual(1);
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });

  it('creates a transfer with external signer [predicate]', async () => {
    const amountToReceiver = 100;

    // #region multiple-signers-4
    // Create and fund predicate
    // #import { Predicate, BaseAssetId };

    // Create the predicate
    const predicate = new Predicate(binPredicate, provider, abiPredicate).setData(
      signer.address.toB256()
    );

    // Create the transaction request
    const request = new ScriptTransactionRequest({ gasPrice, gasLimit: 10_000 });
    request.addCoinOutput(receiver.address, amountToReceiver, BaseAssetId);

    // Get the predicate resources and add them and predicate data to the request
    const resources = await predicate.getResourcesToSpend([
      {
        assetId: BaseAssetId,
        amount: amountToReceiver,
      },
    ]);
    request.addPredicateResources(resources, predicate);
    const parsedRequest = predicate.populateTransactionPredicateData(request);

    // Add witnesses including the signer
    parsedRequest.addWitness('0x');
    await parsedRequest.addSigner(signer);

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
