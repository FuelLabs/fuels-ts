import { BigNumber } from '@ethersproject/bignumber';
import { TransactionType } from '@fuel-ts/providers';
import type { TransactionRequest } from '@fuel-ts/providers';

import { verifyMessage, verifyTransaction } from './utilities';
import Wallet from './wallet';

describe('Wallet', () => {
  const key = '0xae78c8b502571dba876742437f8bc78b689cf8518356c0921393d89caaf284ce';

  it('signs a message', async () => {
    const wallet = new Wallet(key);
    const message = 'this is a random message';
    const verifiedAddress = verifyMessage(message, await wallet.signMessage(message));

    expect(verifiedAddress).toEqual(wallet.address);
  });

  it('signs a transaction', async () => {
    const wallet = new Wallet(key);
    const transaction: TransactionRequest = {
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      script: '0x24400000',
      scriptData: '0x',
      inputs: [],
      outputs: [],
      witnesses: [],
    };
    const signedTransaction = await wallet.signTransaction(transaction);
    const verifiedAddress = verifyTransaction(signedTransaction);

    expect(verifiedAddress).toEqual(wallet.address);
  });
});
