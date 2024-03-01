import { sign } from 'crypto';
import type { Provider, BN } from 'fuels';
import { WalletUnlocked, Predicate, BaseAssetId, Script, FunctionInvocationResult } from 'fuels';

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
    receiver = WalletUnlocked.generate({
      provider: sender.provider,
    });
    signer = WalletUnlocked.generate({
      provider: sender.provider,
    });

    provider = sender.provider;
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  it.only('creates a transfer with external signer [predicate]', async () => {
    const amountToReceiver = 100;

    // #region multiple-signers-2
    // Create and fund predicate
    // #import { Predicate, BaseAssetId };

    const predicate = new Predicate(binPredicate, provider, abiPredicate);
    const tx = await sender.transfer(predicate.address, 100_000, BaseAssetId);
    await tx.waitForResult();

    predicate.setData(signer.address.toB256());

    // Create the transaction request
    const transactionRequest = await predicate.createTransfer(
      receiver.address,
      amountToReceiver,
      BaseAssetId
    );

    // Sign the transaction
    await transactionRequest.addSigner(signer);

    console.log('txRequest', transactionRequest);

    console.log(2);

    // Send the transaction
    const res = await sender.sendTransaction(transactionRequest);
    await res.waitForResult();

    console.log('res', res);

    // #endregion multiple-signers-2
    expect(await receiver.getBalance()).toEqual(amountToReceiver);
  });

  it('creates a transfer with external signer [script]', async () => {
    const amountToReceiver = 100;

    // #region multiple-signers-4
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
    transactionRequest.addSigner(signer);

    // Send the transaction
    const response = await sender.sendTransaction(transactionRequest);
    await response.waitForResult();
    // #endregion multiple-signers-4

    const { value } = await FunctionInvocationResult.build<BN>([scope], response, false, script);

    expect(value.toNumber()).toEqual(1);
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });
});
