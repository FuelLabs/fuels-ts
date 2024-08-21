import { WalletUnlocked, Predicate, getRandomB256 } from 'fuels';
import { safeExec, launchTestNode } from 'fuels/test-utils';

import { SimplePredicate } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Send and Spend Funds from Predicates', () => {
  it('should successfully use predicate to spend assets', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [walletWithFunds],
    } = launched;

    // #region send-and-spend-funds-from-predicates-2
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

    const predicate = new Predicate({
      bytecode: SimplePredicate.bytecode,
      provider,
      abi: SimplePredicate.abi,
      data: [inputAddress],
    });
    // #endregion send-and-spend-funds-from-predicates-2

    // #region send-and-spend-funds-from-predicates-3
    const amountToPredicate = 10_000_000;
    const amountToReceiver = 200;
    const tx = await walletWithFunds.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 1000,
      }
    );

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
      provider.getBaseAssetId()
    );

    ({ isStatusSuccess } = await tx2.waitForResult());
    expect(isStatusSuccess).toBeTruthy();

    const receiverFinalBalance = await receiverWallet.getBalance();
    expect(receiverFinalBalance.gt(receiverInitialBalance)).toBeTruthy();

    ({ isStatusSuccess } = await tx2.waitForResult());
    expect(isStatusSuccess).toBeTruthy();
    // #endregion send-and-spend-funds-from-predicates-5
  });

  const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

  it('should fail when trying to spend predicates entire amount', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [walletWithFunds],
    } = launched;

    const predicate = new Predicate({
      bytecode: SimplePredicate.bytecode,
      provider,
      abi: SimplePredicate.abi,
      data: [inputAddress],
    });

    const amountToPredicate = 100;

    const tx = await walletWithFunds.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 1_000,
      }
    );

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const { error } = await safeExec(async () =>
      predicate.transfer(
        receiverWallet.address,
        await predicate.getBalance(),
        provider.getBaseAssetId()
      )
    );

    // #region send-and-spend-funds-from-predicates-6
    const errorMsg = `The account(s) sending the transaction don't have enough funds to cover the transaction.`;
    // #endregion send-and-spend-funds-from-predicates-6

    expect((<Error>error).message).toMatch(errorMsg);
  });

  it('should fail when set wrong input data for predicate', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [walletWithFunds],
    } = launched;

    const predicateOwner = WalletUnlocked.generate({
      provider,
    });
    const predicate = new Predicate({
      bytecode: SimplePredicate.bytecode,
      abi: SimplePredicate.abi,
      provider: predicateOwner.provider,
      data: [getRandomB256()],
    });

    const amountToPredicate = 10_000_000;

    const tx = await walletWithFunds.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 1000,
      }
    );

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const amountToWallet = 150;

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, amountToWallet, provider.getBaseAssetId())
    );

    // #region send-and-spend-funds-from-predicates-7
    const errorMsg = 'PredicateVerificationFailed';
    // #endregion send-and-spend-funds-from-predicates-7

    expect((<Error>error).message).toMatch(errorMsg);
  });

  it('should ensure predicate createTransfer works as expected', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [walletWithFunds],
    } = launched;

    const predicate = new Predicate({
      bytecode: SimplePredicate.bytecode,
      abi: SimplePredicate.abi,
      provider,
      data: [inputAddress],
    });

    const amountToPredicate = 10_000_000;

    const tx = await walletWithFunds.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 1_000,
      }
    );

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const amountToReceiver = 200;

    // #region send-and-spend-funds-from-predicates-8
    const transactionRequest = await predicate.createTransfer(
      receiverWallet.address,
      amountToReceiver,
      provider.getBaseAssetId(),
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
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [walletWithFunds],
    } = launched;

    const predicate = new Predicate({
      bytecode: SimplePredicate.bytecode,
      abi: SimplePredicate.abi,
      provider,
      data: [inputAddress],
    });

    const amountToPredicate = 300_000;

    const tx = await walletWithFunds.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 1_000,
      }
    );

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
      provider.getBaseAssetId()
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
