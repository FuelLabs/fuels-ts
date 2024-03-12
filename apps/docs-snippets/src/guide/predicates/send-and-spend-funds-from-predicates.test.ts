import { safeExec } from '@fuel-ts/errors/test-utils';
import type { Provider } from 'fuels';
import { WalletUnlocked, Predicate, BN, getRandomB256, BaseAssetId } from 'fuels';

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
  let gasPrice: BN;
  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SIMPLE_PREDICATE
  );
  beforeAll(async () => {
    walletWithFunds = await getTestWallet();
    provider = walletWithFunds.provider;
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  it('should successfully use predicate to spend assets', async () => {
    // #region send-and-spend-funds-from-predicates-2
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
    const predicate = new Predicate({
      bytecode: bin,
      provider,
      abi,
      inputData: [inputAddress],
    });
    // #endregion send-and-spend-funds-from-predicates-2

    // #region send-and-spend-funds-from-predicates-3
    const amountToPredicate = 10_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 1_000,
    });

    await tx.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-3

    const initialPredicateBalance = new BN(await predicate.getBalance()).toNumber();

    expect(initialPredicateBalance).toBeGreaterThanOrEqual(amountToPredicate);

    // #region send-and-spend-funds-from-predicates-5
    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const tx2 = await predicate.transfer(
      receiverWallet.address.toB256(),
      amountToPredicate - 1000,
      BaseAssetId,
      {
        gasPrice,
        gasLimit: 1_000,
      }
    );

    await tx2.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-5
  });

  it('should fail when trying to spend predicates entire amount', async () => {
    const predicate = new Predicate({
      bytecode: bin,
      provider,
      abi,
      inputData: ['0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4'],
    });

    const amountToPredicate = 100;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 1_000,
    });

    await tx.waitForResult();

    const predicateBalance = new BN(await predicate.getBalance()).toNumber();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, predicateBalance, BaseAssetId, {
        gasPrice,
        gasLimit: 1_000,
      })
    );

    // #region send-and-spend-funds-from-predicates-6
    const errorMsg = 'not enough coins to fit the target';
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
      inputData: [getRandomB256()],
    });

    const amountToPredicate = 10_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 1_000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, amountToPredicate, BaseAssetId, {
        gasPrice,
        gasLimit: 1_000,
      })
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
      inputData: [inputAddress],
    });

    const amountToPredicate = 10_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 1_000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    // #region send-and-spend-funds-from-predicates-8
    const transactionRequest = await predicate.createTransfer(
      receiverWallet.address,
      amountToPredicate,
      BaseAssetId,
      {
        gasPrice,
        gasLimit: 1_000,
      }
    );

    const chainId = provider.getChainId();

    const txId = transactionRequest.getTransactionId(chainId);

    const res = await predicate.sendTransaction(transactionRequest);

    await res.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-8
    const txIdFromExecutedTx = res.id;

    expect(txId).toEqual(txIdFromExecutedTx);
  });
});
