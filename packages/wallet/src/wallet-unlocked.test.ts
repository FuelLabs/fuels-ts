import type { BytesLike } from '@ethersproject/bytes';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { randomBytes } from '@fuel-ts/keystore';
import type { CallResult, TransactionRequest, TransactionResponse } from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import * as providersMod from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';
import sendTransactionTest from '@fuel-ts/testcases/src/sendTransaction.json';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';
import signTransactionTest from '@fuel-ts/testcases/src/signTransaction.json';

import { BaseWalletUnlocked } from './base-unlocked-wallet';
import walletSpec from './wallet-spec';
import { WalletLocked, WalletUnlocked } from './wallets';

// TODO: Check if there's a better alternative to this
/**
 * This makes it possible to mock modules that are exported
 * from package's index files, using exports syntax such as:
 *
 *  export * from '...'
 *
 * https://stackoverflow.com/a/72885576
 */
jest.mock('@fuel-ts/providers', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/providers'),
}));

describe('WalletUnlocked', () => {
  it('Instantiate a new wallet', () => {
    const wallet = new WalletUnlocked(signMessageTest.privateKey);

    expect(wallet.publicKey).toEqual(signMessageTest.publicKey);
    expect(wallet.address.toAddress()).toEqual(signMessageTest.address);
  });

  it('Sign a message using wallet instance', async () => {
    const wallet = new WalletUnlocked(signMessageTest.privateKey);
    const signedMessage = await wallet.signMessage(signMessageTest.message);
    const verifiedAddress = Signer.recoverAddress(
      hashMessage(signMessageTest.message),
      signedMessage
    );

    expect(verifiedAddress).toEqual(wallet.address);
    expect(signedMessage).toEqual(signMessageTest.signedMessage);
  });

  it('Sign a transaction using wallet instance', async () => {
    // #region wallet-transaction-signing
    // #context import { WalletUnlocked, hashMessage, Signer} from 'fuels';
    const wallet = new WalletUnlocked(signTransactionTest.privateKey);
    const transactionRequest = signTransactionTest.transaction;
    const signedTransaction = await wallet.signTransaction(transactionRequest);
    const verifiedAddress = Signer.recoverAddress(
      hashTransaction(transactionRequest),
      signedTransaction
    );

    expect(signedTransaction).toEqual(signTransactionTest.signedTransaction);
    expect(verifiedAddress).toEqual(wallet.address);
    // #endregion wallet-transaction-signing
  });

  it('Populate transaction witnesses signature using wallet instance', async () => {
    const wallet = new WalletUnlocked(signTransactionTest.privateKey);
    const transactionRequest = signTransactionTest.transaction;
    const signedTransaction = await wallet.signTransaction(transactionRequest);
    const populatedTransaction = await wallet.populateTransactionWitnessesSignature(
      transactionRequest
    );

    expect(populatedTransaction.witnesses?.[0]).toBe(signedTransaction);
  });

  it('Populate transaction multi-witnesses signature using wallet instance', async () => {
    const wallet = new WalletUnlocked(signTransactionTest.privateKey);
    const privateKey = randomBytes(32);
    const otherWallet = new WalletUnlocked(privateKey);
    const transactionRequest = signTransactionTest.transaction;
    const signedTransaction = await wallet.signTransaction(transactionRequest);
    const otherSignedTransaction = await otherWallet.signTransaction(transactionRequest);
    const populatedTransaction = await wallet.populateTransactionWitnessesSignature({
      ...transactionRequest,
      witnesses: [...transactionRequest.witnesses, otherSignedTransaction],
    });

    expect(populatedTransaction.witnesses?.length).toBe(2);
    expect(populatedTransaction.witnesses).toContain(signedTransaction);
    expect(populatedTransaction.witnesses).toContain(otherSignedTransaction);
  });

  it('Check if send transaction adds signature using wallet instance', async () => {
    const wallet = new WalletUnlocked(signTransactionTest.privateKey);
    const transactionRequest = sendTransactionTest.transaction;
    let signature: BytesLike | undefined;
    // Intercept Provider.sendTransaction to collect signature
    const spy = jest
      .spyOn(wallet.provider, 'sendTransaction')
      .mockImplementation(async (transaction) => {
        signature = transaction.witnesses?.[0];
        return Promise.resolve({} as TransactionResponse);
      });

    // Call send transaction should populate signature field
    await wallet.sendTransaction(transactionRequest);

    // Provider sendTransaction should be called
    expect(spy).toBeCalled();
    // Signature should have a signature
    expect(signature?.length).toBe(130);
  });

  it('Generate a new random wallet', async () => {
    const wallet = WalletUnlocked.generate();
    const message = 'test';
    const signedMessage = await wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('Generate a new random wallet with entropy', async () => {
    const wallet = WalletUnlocked.generate({
      entropy: randomBytes(32),
    });
    const message = 'test';
    const signedMessage = await wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('Create wallet from seed', () => {
    const wallet = WalletUnlocked.fromSeed(
      walletSpec.seed,
      walletSpec.account_1.path,
      new Provider(walletSpec.providerUrl)
    );

    expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet from mnemonic', () => {
    const wallet = WalletUnlocked.fromMnemonic(
      walletSpec.mnemonic,
      walletSpec.account_1.path,
      undefined,
      new Provider(walletSpec.providerUrl)
    );

    expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet from mnemonic with default path', () => {
    const wallet = WalletUnlocked.fromMnemonic(walletSpec.mnemonic);

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
  });

  it('Create wallet from extendedKey', () => {
    const wallet = WalletUnlocked.fromExtendedKey(
      walletSpec.account_0.xprv,
      new Provider(walletSpec.providerUrl)
    );

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet from seed with default path', () => {
    const wallet = WalletUnlocked.fromSeed(
      walletSpec.seed,
      undefined,
      new Provider(walletSpec.providerUrl)
    );

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
    expect(wallet.provider.url).toBe(walletSpec.providerUrl);
  });

  it('Create wallet and lock it', () => {
    const wallet = WalletUnlocked.generate();
    expect(wallet.privateKey).toBeTruthy();
    const lockedWallet = wallet.lock();
    expect(lockedWallet instanceof WalletLocked).toBeTruthy();
  });

  it('should execute simulateTransaction just fine', async () => {
    const transactionRequestLike = 'transactionRequestLike' as unknown as TransactionRequest;
    const transactionRequest = 'transactionRequest' as unknown as TransactionRequest;
    const callResult = 'callResult' as unknown as CallResult;

    const transactionRequestify = jest
      .spyOn(providersMod, 'transactionRequestify')
      .mockImplementation(() => transactionRequest);

    const addMissingVariables = jest
      .spyOn(providersMod.Provider.prototype, 'addMissingVariables')
      .mockImplementation(() => Promise.resolve());

    const call = jest
      .spyOn(providersMod.Provider.prototype, 'call')
      .mockImplementation(() => Promise.resolve(callResult));

    const populateTransactionWitnessesSignatureSpy = jest
      .spyOn(BaseWalletUnlocked.prototype, 'populateTransactionWitnessesSignature')
      .mockImplementationOnce(() => Promise.resolve(transactionRequestLike));

    const wallet = WalletUnlocked.generate();

    const result = await wallet.simulateTransaction(transactionRequestLike);

    expect(result).toEqual(callResult);

    expect(transactionRequestify.mock.calls.length).toBe(1);
    expect(transactionRequestify.mock.calls[0][0]).toEqual(transactionRequestLike);

    expect(addMissingVariables.mock.calls.length).toBe(1);
    expect(addMissingVariables.mock.calls[0][0]).toEqual(transactionRequest);

    expect(populateTransactionWitnessesSignatureSpy.mock.calls.length).toBe(1);
    expect(populateTransactionWitnessesSignatureSpy.mock.calls[0][0]).toEqual(transactionRequest);

    expect(call.mock.calls.length).toBe(1);
    expect(call.mock.calls[0]).toEqual([
      transactionRequestLike,
      {
        utxoValidation: true,
      },
    ]);
  });
});
