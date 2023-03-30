import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';
import signTransactionTest from '@fuel-ts/testcases/src/signTransaction.json';

import { hashMessage, hash, hashTransaction } from './hasher';

describe('Hasher', () => {
  it('Hash message', () => {
    expect(hashMessage(signMessageTest.message)).toEqual(signMessageTest.hashedMessage);
  });

  it('Hash "20"', () => {
    expect(hash(Buffer.from('20'))).toEqual(
      '0xf5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b'
    );
  });

  it('Hash script transaction request', () => {
    const transactionRequest = signTransactionTest.transaction;

    expect(hashTransaction(transactionRequest)).toEqual(signTransactionTest.hashedTransaction);
  });
});
