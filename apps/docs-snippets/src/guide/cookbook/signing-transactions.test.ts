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

  it('creates a transfer with external signer', async () => {
    const amountToReceiver = 100;

    // Create and fund predicate
    const predicate = new Predicate(binPredicate, provider, abiPredicate);
    const tx = await sender.transfer(predicate.address, 50_000, BaseAssetId, {
      gasPrice,
      gasLimit: 100_000,
    });
    await tx.waitForResult();
    console.log(1);

    // Create the transaction request and sign
    const transferRequest = await predicate.createTransfer(
      receiver.address,
      amountToReceiver,
      BaseAssetId,
      {
        gasPrice,
        gasLimit: 100_000,
      }
    );
    predicate.setData(signer.address.toB256());
    const signedTransaction = await signer.signTransaction(transferRequest);
    transferRequest.witnesses.push(signedTransaction);
    console.log(2);

    // Send the transaction
    const res = await sender.sendTransaction(transferRequest);
    await res.waitForResult();

    expect(await receiver.getBalance()).toEqual(amountToReceiver);
  });

  it('creates a transfer with external signer [script]', async () => {
    const amountToReceiver = 100;

    // Create invocation scope
    const script = new Script(binScript, abiScript, sender);
    const scope = script.functions
      .main(signer.address.toB256())
      .txParams({ gasPrice, gasLimit: 1_000_000 });
    await scope.fundWithRequiredCoins();

    // Create the transaction request and sign
    const transferRequest = await scope.getTransactionRequest();
    transferRequest.addCoinOutput(receiver.address, amountToReceiver, BaseAssetId);
    const signedTransaction = await signer.signTransaction(transferRequest);
    transferRequest.witnesses.push(signedTransaction);

    // Send the transaction
    const response = await sender.sendTransaction(transferRequest);
    await response.waitForResult();
    const { value } = await FunctionInvocationResult.build<BN>([scope], response, false, script);

    expect(value.toNumber()).toEqual(1);
    expect((await receiver.getBalance()).toNumber()).toEqual(amountToReceiver);
  });
});
