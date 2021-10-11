import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { expect } from 'chai';

import { Transaction, TransactionCoder, TransactionType } from './transaction';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('TransactionCoder', () => {
  it('Can encode TransactionScript', () => {
    const transaction: Transaction = {
      type: TransactionType.Script,
      data: {
        gasPrice: BigNumber.from(0),
        gasLimit: BigNumber.from(0),
        maturity: BigNumber.from(0),
        scriptLength: BigNumber.from(0),
        scriptDataLength: BigNumber.from(0),
        inputsCount: BigNumber.from(0),
        outputsCount: BigNumber.from(0),
        witnessesCount: BigNumber.from(0),
        receiptsRoot: B256,
        script: '0x',
        scriptData: '0x',
        inputs: [],
        outputs: [],
        witnesses: [],
      },
    };

    const encoded = hexlify(new TransactionCoder('transaction').encode(transaction));

    expect(encoded).to.equal(
      '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder('transaction').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(transaction);
  });

  it('Can encode TransactionCreate', () => {
    const transaction: Transaction = {
      type: TransactionType.Create,
      data: {
        gasPrice: BigNumber.from(0),
        gasLimit: BigNumber.from(0),
        maturity: BigNumber.from(0),
        bytecodeLength: BigNumber.from(0),
        bytecodeWitnessIndex: BigNumber.from(0),
        staticContractsCount: BigNumber.from(0),
        inputsCount: BigNumber.from(0),
        outputsCount: BigNumber.from(0),
        witnessesCount: BigNumber.from(0),
        salt: B256,
        staticContracts: [],
        inputs: [],
        outputs: [],
        witnesses: [],
      },
    };

    const encoded = hexlify(new TransactionCoder('transaction').encode(transaction));

    expect(encoded).to.equal(
      '0x0000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder('transaction').decode(arrayify(encoded), 0);

    expect(offset).to.equal((encoded.length - 2) / 2);
    expect(decoded).to.deep.equal(transaction);
  });
});
