import { BigNumber } from '@ethersproject/bignumber';
import { hexlify } from '@ethersproject/bytes';
import type { Receipt, Transaction } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { expect } from 'chai';

import type { TransactionRequest } from './provider';
import Provider from './provider';

const emptyTreeRoot = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

describe('Provider', () => {
  it('Can get client version', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).to.equal('0.1.0');
  });

  it('Can call', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const script = Uint8Array.from(
      // NOTE: From https://github.com/FuelLabs/fuel-core/blob/a7bbb42075d0ec8787ca7bc151165e44999b01ba/fuel-client/tests/tx.rs#L15
      [80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0]
    );
    const scriptData = Uint8Array.from([]);
    const inputs = [] as any[];

    const transactionRequest: TransactionRequest = {
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      script,
      scriptData,
      inputs,
    };

    const response = await provider.call(transactionRequest);

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

    expect(response.receipts).to.deep.equal(expectedReceipts);
  });

  it('Can dryRun', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const script = Uint8Array.from(
      // NOTE: From https://github.com/FuelLabs/fuel-core/blob/a7bbb42075d0ec8787ca7bc151165e44999b01ba/fuel-client/tests/tx.rs#L15
      [80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0]
    );
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

    const receipts = await provider.dryRun(transaction);

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
