import type { Provider } from 'fuels';
import { WalletUnlocked, Predicate, getRandomB256 } from 'fuels';
import { seedTestWallet, safeExec } from 'fuels/test-utils';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let walletWithFunds: WalletUnlocked;
  let provider: Provider;
  let baseAssetId: string;
  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SIMPLE_PREDICATE
  );
  beforeAll(async () => {
    walletWithFunds = await getTestWallet();
    provider = walletWithFunds.provider;
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
    const predicate = new Predicate({
      bytecode: bin,
      provider,
      abi,
      data: [inputAddress],
    });
    baseAssetId = provider.getBaseAssetId();
    await seedTestWallet(predicate, [[500_000, baseAssetId]]);
  });

  it('should successfully use predicate to spend assets', async () => {
    // #region send-and-spend-funds-from-predicates-2
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
    const predicate = new Predicate({
      bytecode: bin,
      provider,
      abi,
      data: [inputAddress],
    });
    // #endregion send-and-spend-funds-from-predicates-2

    // #region send-and-spend-funds-from-predicates-3
    const amountToPredicate = 1000;
    const amountToReceiver = 200;
    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 1000,
    });

    let { isStatusSuccess } = await tx.waitForResult();
    expect(isStatusSuccess).toBeTruthy();
    // #endregion send-and-spend-funds-from-predicates-3

    // #region send-and-spend-funds-from-predicates-5
    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const receiverInitialBalance = await receiverWallet.getBalance();

    const tx2 = await predicate.transfer(
      receiverWallet.address.toB256(),
      amountToReceiver,
      baseAssetId
    );

    ({ isStatusSuccess } = await tx2.waitForResult());
    expect(isStatusSuccess).toBeTruthy();

    const receiverFinalBalance = await receiverWallet.getBalance();
    expect(receiverFinalBalance.gt(receiverInitialBalance)).toBeTruthy();

    ({ isStatusSuccess } = await tx2.waitForResult());
    expect(isStatusSuccess).toBeTruthy();
    // #endregion send-and-spend-funds-from-predicates-5
  });

  it('should fail when trying to spend predicates entire amount', async () => {
    const predicate = new Predicate({
      bytecode: bin,
      provider,
      abi,
      data: ['0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4'],
    });

    const amountToPredicate = 100;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 1_000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const { error } = await safeExec(async () =>
      predicate.transfer(receiverWallet.address, await predicate.getBalance(), baseAssetId)
    );

    // #region send-and-spend-funds-from-predicates-6
    const errorMsg = 'This account does not have enough funds to cover this transaction.';
    // #endregion send-and-spend-funds-from-predicates-6

    expect((<Error>error).message).toMatch(errorMsg);
  });

  it('should fail when set wrong input data for predicate', async () => {
    const predicateOwner = WalletUnlocked.generate({
      provider,
    });
    const predicate = new Predicate({
      bytecode: bin,
      abi,
      provider: predicateOwner.provider,
      data: [getRandomB256()],
    });

    const amountToPredicate = 10000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 1000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const amountToWallet = 150;

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, amountToWallet, baseAssetId)
    );

    // #region send-and-spend-funds-from-predicates-7
    const errorMsg = 'PredicateVerificationFailed';
    // #endregion send-and-spend-funds-from-predicates-7

    expect((<Error>error).message).toMatch(errorMsg);
  });

  it('should ensure predicate createTransfer works as expected', async () => {
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
    const predicate = new Predicate({
      bytecode: bin,
      abi,
      provider,
      data: [inputAddress],
    });

    const amountToPredicate = 10_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 1_000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const amountToReceiver = 200;

    // #region send-and-spend-funds-from-predicates-8
    const transactionRequest = await predicate.createTransfer(
      receiverWallet.address,
      amountToReceiver,
      baseAssetId,
      {
        gasLimit: 1000,
      }
    );

    /*
      You can retrieve the transaction ID before actually submitting it to the node
      like this:
     */

    const chainId = provider.getChainId();
    const txId = transactionRequest.getTransactionId(chainId);

    const res = await predicate.sendTransaction(transactionRequest);

    await res.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-8
    const txIdFromExecutedTx = res.id;

    expect(txId).toEqual(txIdFromExecutedTx);
  });

  it('should be able to pre-stage a transaction, get TX ID, and then send the transaction', async () => {
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
    const predicate = new Predicate({
      bytecode: bin,
      abi,
      provider,
      data: [inputAddress],
    });

    const amountToPredicate = 300_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 1_000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const transferAmount = 1000;

    // #region predicates-prestage-transaction
    // Prepare the transaction
    const preparedTx = await predicate.createTransfer(
      receiverWallet.address,
      transferAmount,
      baseAssetId
    );

    // Get the transaction ID before sending the transaction
    const txId = preparedTx.getTransactionId(provider.getChainId());

    // Send the transaction
    const res = await predicate.sendTransaction(preparedTx);
    await res.waitForResult();
    // #endregion predicates-prestage-transaction

    const txIdFromExecutedTx = res.id;

    expect(txId).toEqual(txIdFromExecutedTx);
  });
});
