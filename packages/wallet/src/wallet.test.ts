import type { ScriptTransactionRequest } from '@fuel-ts/providers';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';
import signTransactionTest from '@fuel-ts/testcases/src/signTransaction.json';

import { hashMessage, hashTransaction } from './hasher';
import Signer from './signer';
import Wallet from './wallet';

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
});
