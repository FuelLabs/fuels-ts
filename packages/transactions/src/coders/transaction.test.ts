import { arrayify, hexlify } from '@ethersproject/bytes';

import type { Transaction } from './transaction';
import { TransactionCoder, TransactionType } from './transaction';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('TransactionCoder', () => {
  it('Can encode TransactionScript', () => {
    const transaction: Transaction = {
      type: TransactionType.Script,
      gasPrice: 0n,
      gasLimit: 0n,
      bytePrice: 0n,
      maturity: 0n,
      scriptLength: 0,
      scriptDataLength: 0,
      inputsCount: 0,
      outputsCount: 0,
      witnessesCount: 0,
      receiptsRoot: B256,
      script: '0x',
      scriptData: '0x',
      inputs: [],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder('transaction').encode(transaction));

    expect(encoded).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder('transaction').decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(decoded).toEqual(transaction);
  });

  it('Can encode TransactionCreate', () => {
    const transaction: Transaction = {
      type: TransactionType.Create,
      gasPrice: 0n,
      gasLimit: 0n,
      bytePrice: 0n,
      maturity: 0n,
      bytecodeLength: 0,
      bytecodeWitnessIndex: 0,
      staticContractsCount: 0,
      storageSlotsCount: 0,
      inputsCount: 0,
      outputsCount: 0,
      witnessesCount: 0,
      salt: B256,
      staticContracts: [],
      storageSlots: [],
      inputs: [],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder('transaction').encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder('transaction').decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(decoded).toEqual(transaction);
  });
});
