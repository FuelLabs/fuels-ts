import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Receipt } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { expect } from 'chai';

import Provider from './provider';
import { getContractId } from './util';

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).to.equal('0.1.0');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      maturity: BigNumber.from(0),
      script: Uint8Array.from(
        // NOTE: From https://github.com/FuelLabs/fuel-core/blob/a7bbb42075d0ec8787ca7bc151165e44999b01ba/fuel-client/tests/tx.rs#L15
        [80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0]
      ),
      scriptData: Uint8Array.from([]),
      inputs: [],
      outputs: [],
      witnesses: [],
    });

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

    expect(callResult.receipts).to.deep.equal(expectedReceipts);
  });

  it('can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const { startSession: id } = await provider.operations.startSession();

    const { reset: resetSuccess } = await provider.operations.reset({ sessionId: id });
    expect(resetSuccess).to.equal(true);

    const { endSession: endSessionSuccess } = await provider.operations.endSession({
      sessionId: id,
    });
    expect(endSessionSuccess).to.equal(true);
  });

  it('can upload a contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Submit contract
    const bytecode = arrayify('0x114000111144002a104904405941148034480000');
    const salt = hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));
    const transaction = await provider.submitContract(bytecode, salt);

    expect(transaction.contractId).to.equal(getContractId(bytecode, salt));
  });
});
