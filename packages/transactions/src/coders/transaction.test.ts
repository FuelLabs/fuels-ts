import { arrayify, hexlify } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';

import { InputType } from './input';
import type { Transaction } from './transaction';
import { TransactionCoder, TransactionType } from './transaction';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('TransactionCoder', () => {
  it('Can encode TransactionScript', () => {
    const transaction: Transaction = {
      type: TransactionType.Script,
      gasPrice: bn(0),
      gasLimit: bn(0),
      maturity: 0,
      scriptLength: 0,
      scriptDataLength: 0,
      inputsCount: 1,
      outputsCount: 0,
      witnessesCount: 0,
      receiptsRoot: B256,
      script: '0x',
      scriptData: '0x',
      inputs: [
        {
          type: InputType.Contract,
          utxoID: { transactionId: B256, outputIndex: 0 },
          balanceRoot: B256,
          stateRoot: B256,
          contractID: B256,
          txPointer: {
            blockHeight: 0,
            txIndex: 0,
          },
        },
      ],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.parse(JSON.stringify(decoded))).toMatchObject(
      JSON.parse(JSON.stringify(transaction))
    );
  });

  it('Can encode TransactionCreate', () => {
    const transaction: Transaction = {
      type: TransactionType.Create,
      gasPrice: bn(0),
      gasLimit: bn(0),
      maturity: 0,
      bytecodeLength: 0,
      bytecodeWitnessIndex: 0,
      storageSlotsCount: 0,
      inputsCount: 0,
      outputsCount: 0,
      witnessesCount: 0,
      salt: B256,
      storageSlots: [],
      inputs: [],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x0000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(transaction));
  });
});
