import { BigNumber } from '@ethersproject/bignumber';
import { hexlify } from '@ethersproject/bytes';
import type { Receipt, Transaction } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { expect } from 'chai';

import Provider from './provider';

const emptyTreeRoot = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

describe('Provider', () => {
  it('Can get client version', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).to.equal('0.1.0');
  });

  it('Can run tx', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const script = Uint8Array.from([17, 64, 0, 202, 17, 68, 0, 186, 89, 65, 16, 0, 52, 4, 0, 0]);
    const scriptData = Uint8Array.from([]);
    const inputs = [] as any[];
    const outputs = [] as any[];
    const witnesses = [] as any[];

    const transaction: Transaction = {
      type: TransactionType.Script,
      data: {
        gasPrice: BigNumber.from(0),
        gasLimit: BigNumber.from(1000000),
        maturity: BigNumber.from(0),
        scriptLength: BigNumber.from(script.length),
        scriptDataLength: BigNumber.from(scriptData.length),
        inputsCount: BigNumber.from(inputs.length),
        outputsCount: BigNumber.from(outputs.length),
        witnessesCount: BigNumber.from(witnesses.length),
        receiptsRoot: emptyTreeRoot,
        script: hexlify(script),
        scriptData: hexlify(scriptData),
        inputs,
        outputs,
        witnesses,
      },
    };

    const receipts = await provider.call(transaction);

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        data: {
          id: '0x0000000000000000000000000000000000000000000000000000000000000000',
          val0: BigNumber.from(202),
          val1: BigNumber.from(186),
          val2: BigNumber.from(0),
          val3: BigNumber.from(0),
          pc: BigNumber.from(472),
          is: BigNumber.from(464),
        },
      },
      {
        type: ReceiptType.Return,
        data: {
          id: '0x0000000000000000000000000000000000000000000000000000000000000000',
          val: BigNumber.from(1),
          pc: BigNumber.from(476),
          is: BigNumber.from(464),
        },
      },
    ];

    expect(receipts.length).to.equal(2);
    expect(receipts).to.deep.equal(expectedReceipts);
  });

  it('Can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const id = await provider.startSession();

    const resetSuccess = await provider.reset(id);
    expect(resetSuccess).to.equal(true);

    const endSessionSuccess = await provider.endSession(id);
    expect(endSessionSuccess).to.equal(true);
  });
});
