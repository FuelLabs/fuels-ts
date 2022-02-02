import { BigNumber } from '@ethersproject/bignumber';
import { hexlify } from '@ethersproject/bytes';
import type { ScriptTransactionRequest } from '@fuel-ts/providers';
import sendTransactionTest from '@fuel-ts/testcases/src/sendTransaction.json';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';
import signTransactionTest from '@fuel-ts/testcases/src/signTransaction.json';

import { hashMessage, hashTransaction } from './hasher';
import Signer from './signer';
import Wallet from './wallet';

const genBytes32 = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('Wallet', () => {
  it('Instantiate a new wallet', async () => {
    const wallet = new Wallet(signMessageTest.privateKey);

    expect(wallet.publicKey).toEqual(signMessageTest.publicKey);
    expect(wallet.address).toEqual(signMessageTest.address);
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
    const transactionRequest: ScriptTransactionRequest = signTransactionTest.transaction;
    const signedTransaction = wallet.signTransaction(transactionRequest);
    const verifiedAddress = Signer.recoverAddress(
      hashTransaction(transactionRequest),
      signedTransaction
    );

    expect(signedTransaction).toEqual(signTransactionTest.signedTransaction);
    expect(verifiedAddress).toEqual(wallet.address);
  });

  it('Populate transaction witenesses signature using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const transactionRequest: ScriptTransactionRequest = signTransactionTest.transaction;
    const signedTransaction = wallet.signTransaction(transactionRequest);
    const populatedTransaction = wallet.populateTransactionWitnessesSignature(transactionRequest);

    expect(populatedTransaction.witnesses?.[0]).toBe(signedTransaction);
  });

  it('Populate transaction multi-witenesses signature using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const privateKey = genBytes32();
    const otherWallet = new Wallet(privateKey);
    const transactionRequest: ScriptTransactionRequest = signTransactionTest.transaction;
    const signedTransaction = wallet.signTransaction(transactionRequest);
    const otherSignedTransaction = otherWallet.signTransaction(transactionRequest);
    const populatedTransaction = wallet.populateTransactionWitnessesSignature({
      ...transactionRequest,
      witnesses: [otherSignedTransaction],
    });

    expect(populatedTransaction.witnesses?.length).toBe(2);
    expect(populatedTransaction.witnesses).toContain(signedTransaction);
    expect(populatedTransaction.witnesses).toContain(otherSignedTransaction);
  });

  it('Send transaction with signature using wallet instance', async () => {
    const wallet = new Wallet(signTransactionTest.privateKey);
    const { owner, color } = sendTransactionTest.getCoins;
    const transactionRequest: ScriptTransactionRequest = {
      ...sendTransactionTest.transaction,
      scriptData: genBytes32(),
    };
    const transactionResponse = await wallet.sendTransaction(transactionRequest);

    // Wait transaction to end
    await transactionResponse.wait();
    const toCoins = await wallet.provider.getCoins(owner, color);

    expect(toCoins[0]).toEqual(
      expect.objectContaining({
        ...sendTransactionTest.getCoins,
        amount: BigNumber.from(sendTransactionTest.getCoins.amount),
      })
    );
  });
});
