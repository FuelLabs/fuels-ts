import { bn } from '@fuel-ts/math';
import { getBytesCopy, hexlify } from 'ethers';

import { InputType } from './input';
import { OutputType } from './output';
import { PolicyType } from './policy';
import type { Transaction } from './transaction';
import { TransactionCoder, TransactionType } from './transaction';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const U32 = 1000;
const U16 = 32;
const U8 = 1;

describe('TransactionCoder', () => {
  it('Can encode/decode TransactionScript without inputs, outputs and witnesses', () => {
    const transaction: Transaction<TransactionType.Script> = {
      type: TransactionType.Script,
      scriptGasLimit: bn(U32),
      scriptLength: U16,
      scriptDataLength: U16,
      policyTypes: 5,
      inputsCount: 0,
      outputsCount: 0,
      witnessesCount: 0,
      receiptsRoot: B256,
      script: B256,
      scriptData: B256,
      policies: [
        { type: PolicyType.GasPrice, data: bn(U32) },
        { type: PolicyType.Maturity, data: U32 },
      ],
      inputs: [],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000000000000000003e8000000000000002000000000000000200000000000000005000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000003e800000000000003e8'
    );

    const [decoded, offset] = new TransactionCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(transaction));
  });

  it('Can encode/decode TransactionScript with inputs, outputs and witnesses', () => {
    const transaction: Transaction<TransactionType.Script> = {
      type: TransactionType.Script,
      scriptGasLimit: bn(U32),
      scriptLength: U16,
      scriptDataLength: U16,
      policyTypes: 7,
      inputsCount: 1,
      outputsCount: 1,
      witnessesCount: 3,
      receiptsRoot: B256,
      script: B256,
      scriptData: B256,
      policies: [
        { type: PolicyType.GasPrice, data: bn(U32) },
        { type: PolicyType.WitnessLimit, data: bn(U32) },
        { type: PolicyType.Maturity, data: U32 },
      ],
      inputs: [
        {
          type: InputType.Contract,
          txID: B256,
          outputIndex: 0,
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
      '0x000000000000000000000000000003e8000000000000002000000000000000200000000000000007000000000000000100000000000000010000000000000003d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000003e800000000000003e800000000000003e80000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b000000000000000101000000000000000000000000000002010100000000000000000000000000030101010000000000'
    );

    const [decoded, offset] = new TransactionCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.parse(JSON.stringify(decoded))).toMatchObject(
      JSON.parse(JSON.stringify(transaction))
    );
  });

  it('Can encode/decode TransactionCreate without inputs, outputs and witnesses', () => {
    const transaction: Transaction<TransactionType.Create> = {
      type: TransactionType.Create,
      bytecodeLength: U16,
      bytecodeWitnessIndex: U8,
      policyTypes: 1,
      storageSlotsCount: 0,
      inputsCount: 0,
      outputsCount: 0,
      witnessesCount: 0,
      salt: B256,
      policies: [{ type: PolicyType.GasPrice, data: bn(U32) }],
      storageSlots: [],
      inputs: [],
      outputs: [],
      witnesses: [],
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x00000000000000010000000000000020000000000000000100000000000000010000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000003e8'
    );

    const [decoded, offset] = new TransactionCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(transaction));
  });

  it('Can encode/decode TransactionCreate with inputs, outputs and witnesses', () => {
    const transaction: Transaction<TransactionType.Create> = {
      type: TransactionType.Create,
      bytecodeLength: U16,
      bytecodeWitnessIndex: U8,
      policyTypes: 15,
      storageSlotsCount: 1,
      inputsCount: 3,
      outputsCount: 2,
      witnessesCount: 1,
      salt: B256,
      policies: [
        { type: PolicyType.GasPrice, data: bn(U32) },
        { type: PolicyType.WitnessLimit, data: bn(U32) },
        { type: PolicyType.Maturity, data: U32 },
        { type: PolicyType.MaxFee, data: bn(U32) },
      ],
      storageSlots: [{ key: B256, value: B256 }],
      inputs: [
        {
          type: InputType.Contract,
          txID: B256,
          outputIndex: 0,
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
          txID: B256,
          outputIndex: 0,
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
          txID: B256,
          outputIndex: 0,
          owner: B256,
          amount: bn(0),
          assetId: B256,
          txPointer: {
            blockHeight: 0,
            txIndex: 0,
          },
          witnessIndex: 0,
          maturity: 0,
          predicateGasUsed: bn(0),
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
      '0x000000000000000100000000000000200000000000000001000000000000000f0000000000000001000000000000000300000000000000020000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000003e800000000000003e800000000000003e800000000000003e8d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000020d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.parse(JSON.stringify(decoded))).toMatchObject(
      JSON.parse(JSON.stringify(transaction))
    );
  });

  it('Can encode/decode TransactionMint', () => {
    const transaction: Transaction<TransactionType.Mint> = {
      type: TransactionType.Mint,
      txPointer: {
        blockHeight: 0,
        txIndex: 0,
      },
      inputContract: {
        type: InputType.Contract,
        txID: B256,
        outputIndex: 0,
        balanceRoot: B256,
        stateRoot: B256,
        contractID: B256,
        txPointer: {
          blockHeight: 0,
          txIndex: 0,
        },
      },
      outputContract: {
        type: OutputType.Contract,
        inputIndex: 0,
        balanceRoot: B256,
        stateRoot: B256,
      },
      mintAmount: bn(0),
      mintAssetId: B256,
    };

    const encoded = hexlify(new TransactionCoder().encode(transaction));

    expect(encoded).toEqual(
      '0x000000000000000200000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b00000000000000000000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b0000000000000000d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const [decoded, offset] = new TransactionCoder().decode(getBytesCopy(encoded), 0);

    expect(offset).toEqual((encoded.length - 2) / 2);
    expect(JSON.parse(JSON.stringify(decoded))).toMatchObject(
      JSON.parse(JSON.stringify(transaction))
    );
  });
});
