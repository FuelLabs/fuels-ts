import type { BytesLike } from '@ethersproject/bytes';
import { hashMessage, hashTransaction } from '@fuel-ts/hasher';
import { randomBytes } from '@fuel-ts/keystore';
import { Signer } from '@fuel-ts/signer';
import sendTransactionTest from '@fuel-ts/testcases/src/sendTransaction.json';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';
import signTransactionTest from '@fuel-ts/testcases/src/signTransaction.json';

import Wallet from './wallet';
import walletSpec from './wallet-spec';

describe('Wallet', () => {
  it('Instantiate a new wallet', async () => {
    const wallet = new Wallet(signMessageTest.privateKey);

    expect(wallet.publicKey).toEqual(signMessageTest.publicKey);
    expect(wallet.address.address).toEqual(signMessageTest.address);
  });

  it('Sign a message using wallet instance', async () => {
    const wallet = new Wallet(signMessageTest.privateKey);
    const signedMessage = wallet.signMessage(signMessageTest.message);
    const verifiedAddress = Signer.recoverAddress(
      hashMessage(signMessageTest.message),
      signedMessage
    );

    expect(verifiedAddress).toEqual(wallet.address);
    expect(signedMessage).toEqual(signMessageTest.signedMessage);
  });

  it('Sign a transaction using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const transactionRequest = signTransactionTest.transaction;
    const signedTransaction = wallet.signTransaction(transactionRequest);
    const verifiedAddress = Signer.recoverAddress(
      hashTransaction(transactionRequest),
      signedTransaction
    );

    expect(signedTransaction).toEqual(signTransactionTest.signedTransaction);
    expect(verifiedAddress).toEqual(wallet.address);
  });

  it('Populate transaction witnesses signature using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const transactionRequest = signTransactionTest.transaction;
    const signedTransaction = wallet.signTransaction(transactionRequest);
    const populatedTransaction = wallet.populateTransactionWitnessesSignature(transactionRequest);

    expect(populatedTransaction.witnesses?.[0]).toBe(signedTransaction);
  });

  it('Populate transaction multi-witnesses signature using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const privateKey = randomBytes(32);
    const otherWallet = new Wallet(privateKey);
    const transactionRequest = signTransactionTest.transaction;
    const signedTransaction = wallet.signTransaction(transactionRequest);
    const otherSignedTransaction = otherWallet.signTransaction(transactionRequest);
    const populatedTransaction = wallet.populateTransactionWitnessesSignature({
      ...transactionRequest,
      witnesses: [...transactionRequest.witnesses, otherSignedTransaction],
    });

    expect(populatedTransaction.witnesses?.length).toBe(2);
    expect(populatedTransaction.witnesses).toContain(signedTransaction);
    expect(populatedTransaction.witnesses).toContain(otherSignedTransaction);
  });

  it('Check if send transaction adds signature using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const transactionRequest = sendTransactionTest.transaction;
    let signature: BytesLike | undefined;
    // Intercept Provider.sendTransaction to collect signature
    const spy = jest
      .spyOn(wallet.provider, 'sendTransaction')
      .mockImplementation(async (transaction) => {
        signature = transaction.witnesses?.[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return {} as any;
      });

    // Call send transaction should populate signature field
    await wallet.sendTransaction(transactionRequest);

    // Provider sendTransaction should be called
    expect(spy).toBeCalled();
    // Signature should have a signature
    expect(signature?.length).toBe(130);
  });

  it('Generate a new random wallet', async () => {
    const wallet = Wallet.generate();
    const message = 'test';
    const signedMessage = wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('Generate a new random wallet with entropy', async () => {
    const wallet = Wallet.generate({
      entropy: randomBytes(32),
    });
    const message = 'test';
    const signedMessage = wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });

  it('Create wallet from seed', async () => {
    const wallet = Wallet.fromSeed(walletSpec.seed, walletSpec.account_1.path);

    expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
  });

  it('Create wallet from mnemonic', async () => {
    const wallet = Wallet.fromMnemonic(walletSpec.mnemonic, walletSpec.account_1.path);

    expect(wallet.publicKey).toBe(walletSpec.account_1.publicKey);
  });

  it('Create wallet from extendedKey', async () => {
    const wallet = Wallet.fromExtendedKey(walletSpec.account_0.xprv);

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
  });

  it('Create wallet from seed with default path', async () => {
    const wallet = Wallet.fromSeed(walletSpec.seed);

    expect(wallet.publicKey).toBe(walletSpec.account_0.publicKey);
  });
});
