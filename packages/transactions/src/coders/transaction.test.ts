import { arrayify, hexlify } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';

import { InputType } from './input';
import { OutputType } from './output';
import type { Transaction } from './transaction';
import { TransactionCoder, TransactionType } from './transaction';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const U32 = 1000;
const U16 = 32;
const U8 = 1;

describe('TransactionCoder', () => {
  it('Can encode TransactionScript without inputs, outputs and witnesses', () => {
    const transaction: Transaction = {
      type: TransactionType.Script,
      gasPrice: bn(U32),
      gasLimit: bn(U32),
      maturity: U32,
      scriptLength: U16,
      scriptDataLength: U16,
      inputsCount: 0,
      outputsCount: 0,
      witnessesCount: 0,
      receiptsRoot: B256,
      script: B256,
      scriptData: B256,
      inputs: [],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000000000000000003e800000000000003e800000000000003e800000000000000200000000000000020000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(transaction));
  });

  it('Can encode TransactionScript with inputs, outputs and witnesses', () => {
    const transaction: Transaction = {
      type: TransactionType.Script,
      gasPrice: bn(U32),
      gasLimit: bn(U32),
      maturity: U32,
      scriptLength: U16,
      scriptDataLength: U16,
      inputsCount: 1,
      outputsCount: 2,
      witnessesCount: 3,
      receiptsRoot: B256,
      script: B256,
      scriptData: B256,
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
      outputs: [
        {
          type: OutputType.Withdrawal,
          to: B256,
          amount: bn(1),
          assetId: B256,
        },
        {
          type: OutputType.Coin,
          to: B256,
          amount: bn(1),
          assetId: B256,
        },
      ],
      witnesses: [
        {
          dataLength: 1,
          data: '0x01',
        },
        {
          dataLength: 2,
          data: '0x0101',
        },
        {
          dataLength: 3,
          data: '0x010101',
        },
      ],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000000000000000003e800000000000003e800000000000003e800000000000000200000000000000020000000000000000100000000000000020000000000000003d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000002d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000101000000000000000000000000000002010100000000000000000000000000030101010000000000'
    );

    const [decoded, offset] = new TransactionCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.parse(JSON.stringify(decoded))).toMatchObject(
      JSON.parse(JSON.stringify(transaction))
    );
  });

  it('Can encode TransactionCreate without inputs, outputs and witnesses', () => {
    const transaction: Transaction = {
      type: TransactionType.Create,
      gasPrice: bn(U32),
      gasLimit: bn(U32),
      maturity: U32,
      bytecodeLength: U16,
      bytecodeWitnessIndex: U8,
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
      '0x000000000000000100000000000003e800000000000003e800000000000003e8000000000000002000000000000000010000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(transaction));
  });

  it('Can encode TransactionCreate with inputs, outputs and witnesses', () => {
    const transaction: Transaction = {
      type: TransactionType.Create,
      gasPrice: bn(U32),
      gasLimit: bn(U32),
      maturity: U32,
      bytecodeLength: U16,
      bytecodeWitnessIndex: U8,
      storageSlotsCount: 1,
      inputsCount: 3,
      outputsCount: 2,
      witnessesCount: 1,
      salt: B256,
      storageSlots: [{ key: B256, value: B256 }],
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
        {
          type: InputType.Coin,
          utxoID: { transactionId: B256, outputIndex: 0 },
          owner: B256,
          amount: bn(0),
          assetId: B256,
          txPointer: {
            blockHeight: 0,
            txIndex: 0,
          },
          witnessIndex: 0,
          maturity: 0,
          predicateLength: 0,
          predicateDataLength: 0,
          predicate: '0x',
          predicateData: '0x',
        },
      ],
      outputs: [
        {
          type: OutputType.Coin,
          to: B256,
          amount: bn(1),
          assetId: B256,
        },
        {
          type: OutputType.Coin,
          to: B256,
          amount: bn(1),
          assetId: B256,
        },
      ],
      witnesses: [
        {
          dataLength: 32,
          data: B256,
        },
      ],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000100000000000003e800000000000003e800000000000003e8000000000000002000000000000000010000000000000001000000000000000300000000000000020000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000020d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(arrayify(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.parse(JSON.stringify(decoded))).toMatchObject(
      JSON.parse(JSON.stringify(transaction))
    );
  });
});
