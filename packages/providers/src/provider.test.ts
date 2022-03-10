/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import { Interface } from '@fuel-ts/abi-coder';
import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
import type { Receipt, ReceiptLog } from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { readFileSync } from 'fs';
import { join } from 'path';

import Provider from './provider';
import contractABI from './test-contract/out/debug/test-contract-abi.json';
import { getContractId } from './util';

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).toEqual('0.4.1');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      bytePrice: BigNumber.from(0),
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
    });

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: BigNumber.from(202),
        val1: BigNumber.from(186),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(0x01e0),
        is: BigNumber.from(0x01d8),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: BigNumber.from(1),
        pc: BigNumber.from(0x01e4),
        is: BigNumber.from(0x01d8),
      },
      {
        type: ReceiptType.ScriptResult,
        result: BigNumber.from(0),
        gasUsed: BigNumber.from(0x2c),
      },
    ];

    expect(callResult.receipts).toEqual(expectedReceipts);
  });

  it('can sendTransaction()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      bytePrice: BigNumber.from(0),
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: randomBytes(32),
    });

    const result = await response.wait();

    expect(result.receipts).toEqual([
      {
        type: ReceiptType.Log,
        id: ZeroBytes32,
        val0: BigNumber.from(202),
        val1: BigNumber.from(186),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(0x01e0),
        is: BigNumber.from(0x01d8),
      },
      {
        type: ReceiptType.Return,
        id: ZeroBytes32,
        val: BigNumber.from(1),
        pc: BigNumber.from(0x01e4),
        is: BigNumber.from(0x01d8),
      },
      {
        type: ReceiptType.ScriptResult,
        result: BigNumber.from(0),
        gasUsed: BigNumber.from(0x2c),
      },
    ]);
  });

  it('can transfer coin', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const sender = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const receiverA = randomBytes(32);
    const receiverB = randomBytes(32);
    const assetIdA = NativeAssetId;
    const assetIdB = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const amount = BigNumber.from(1);

    const coins = await provider.getCoinsToSpend(sender, [
      { assetId: assetIdA, amount: amount.mul(2) },
      { assetId: assetIdB, amount: amount.mul(2) },
    ]);

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      bytePrice: BigNumber.from(0),
      script: '0x24400000',
      scriptData: '0x',
      inputs: coins.map((coin) => ({
        type: InputType.Coin,
        ...coin,
        witnessIndex: 0,
      })),
      outputs: [
        {
          type: OutputType.Coin,
          to: receiverA,
          assetId: assetIdA,
          amount,
        },
        {
          type: OutputType.Coin,
          to: receiverA,
          assetId: assetIdB,
          amount,
        },
        {
          type: OutputType.Coin,
          to: receiverB,
          assetId: assetIdA,
          amount,
        },
        {
          type: OutputType.Coin,
          to: receiverB,
          assetId: assetIdB,
          amount,
        },
        { type: OutputType.Change, assetId: assetIdA, to: sender },
        { type: OutputType.Change, assetId: assetIdB, to: sender },
      ],
      witnesses: ['0x'],
    });

    await response.wait();

    const receiverACoins = await provider.getCoins(receiverA, undefined, { first: 9999 });
    expect(receiverACoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount }),
        expect.objectContaining({ assetId: assetIdB, amount }),
      ])
    );

    const receiverBCoins = await provider.getCoins(receiverB, undefined, { first: 9999 });
    expect(receiverBCoins).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ assetId: assetIdA, amount }),
        expect.objectContaining({ assetId: assetIdB, amount }),
      ])
    );
  });

  it('can manage session', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const { startSession: id } = await provider.operations.startSession();

    const { reset: resetSuccess } = await provider.operations.reset({ sessionId: id });
    expect(resetSuccess).toEqual(true);

    const { endSession: endSessionSuccess } = await provider.operations.endSession({
      sessionId: id,
    });
    expect(endSessionSuccess).toEqual(true);
  });

  it('can upload a contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Submit contract
    const bytecode = arrayify('0x114000111144002a104904405941148034480000');
    const salt = randomBytes(32);
    const stateRoot = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    const transaction = await provider.submitContract(bytecode, salt);

    expect(transaction).toEqual(
      expect.objectContaining({ contractId: getContractId(bytecode, salt, stateRoot) })
    );
  });

  /**
   * This test is a port of:
   * https://github.com/FuelLabs/fuel-vm/blob/9cf81834a33e4a7cb808924bb10ab9ff7878e330/tests/flow.rs#L102-L185
   */
  it('can call a contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const iface = new Interface([
      {
        type: 'function',
        name: 'foo',
        inputs: [{ name: 'value', type: 'u64' }],
        outputs: [{ name: 'ret', type: 'u64' }],
      },
    ]);

    // Submit contract
    const bytecode = arrayify(
      readFileSync(join(__dirname, './test-contract/out/debug/test-contract.bin'))
    );
    const salt = randomBytes(32);
    const transaction = await provider.submitContract(bytecode, salt);

    // Call contract
    const fnData = iface.encodeFunctionData('foo', [BigNumber.from(0xdeadbeef)]);

    const response = await provider.submitContractCall(transaction.contractId, fnData);

    const result = await response.wait();

    const logs = result.receipts.filter(
      (receipt) => receipt.type === ReceiptType.Log
    ) as ReceiptLog[];

    expect(logs).toEqual([
      expect.objectContaining({
        val0: BigNumber.from(0xdeadbeef),
        val1: BigNumber.from(0x00),
        val2: BigNumber.from(0x00),
        val3: BigNumber.from(0x00),
      }),
    ]);
  });

  it('can call a contract with structs', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const iface = new Interface([
      {
        type: 'function',
        name: 'boo',
        inputs: [
          {
            name: 'value',
            type: 'struct TestStruct',
            components: [
              { name: 'a', type: 'bool' },
              { name: 'b', type: 'u64' },
            ],
          },
        ],
        outputs: [
          {
            name: '',
            type: 'struct TestStruct',
            components: [
              { name: 'a', type: 'bool' },
              { name: 'b', type: 'u64' },
            ],
          },
        ],
      },
    ]);

    // Submit contract
    const bytecode = arrayify(
      readFileSync(join(__dirname, './test-contract/out/debug/test-contract.bin'))
    );
    const salt = randomBytes(32);
    const transaction = await provider.submitContract(bytecode, salt);

    // Call contract
    const fnData = iface.encodeFunctionData('boo', [{ a: true, b: BigNumber.from(0xdeadbeee) }]);

    const response = await provider.submitContractCall(transaction.contractId, fnData);

    const result = await response.wait();

    expect(hexlify(result.data)).toEqual(
      iface.encodeFunctionResult('boo', [{ a: false, b: BigNumber.from(0xdeadbeef) }])
    );
  });

  it('can call a function with empty arguments', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const iface = new Interface([
      {
        inputs: [{ name: 'value', type: 'u64' }],
        name: 'barfoo',
        outputs: [{ name: '', type: 'u64' }],
        type: 'function',
      },
      {
        inputs: [{ name: 'value', type: '()' }],
        name: 'foobar',
        outputs: [{ name: '', type: 'u64' }],
        type: 'function',
      },
    ]);

    // Submit contract
    const bytecode = arrayify(
      readFileSync(join(__dirname, './test-contract/out/debug/test-contract.bin'))
    );
    const salt = randomBytes(32);
    const transaction = await provider.submitContract(bytecode, salt);

    // Call contract
    let fnData = iface.encodeFunctionData('barfoo', [0]);
    let response = await provider.submitContractCall(transaction.contractId, fnData);
    let result = await response.wait();

    expect(hexlify(result.data)).toEqual(iface.encodeFunctionResult('barfoo', [63]));

    fnData = iface.encodeFunctionData('foobar');
    response = await provider.submitContractCall(transaction.contractId, fnData);
    result = await response.wait();

    expect(hexlify(result.data)).toEqual(iface.encodeFunctionResult('foobar', [63]));
  });

  [
    {
      method: 'foobar_no_params',
      values: [],
      expected: 50,
    },
    {
      method: 'sum',
      values: [10, 20],
      expected: 30,
    },
    {
      method: 'sum_test',
      values: [
        10,
        {
          a: 20,
          b: 30,
        },
      ],
      expected: 60,
    },
    {
      method: 'sum_single',
      values: [
        {
          a: 34,
          b: 34,
        },
      ],
      expected: 68,
    },
    {
      method: 'sum_multparams',
      values: [10, 10, 10, 10, 40],
      expected: 80,
    },
    {
      method: 'add_ten',
      values: [
        {
          a: 20,
        },
      ],
      expected: 30,
    },
    {
      method: 'echo_b256',
      values: ['0x0000000000000000000000000000000000000000000000000000000000000001'],
      expected: 1,
    },
  ].forEach(async ({ method, values, expected }) => {
    it(`Test call with multiple arguments and different types -> ${method}`, async () => {
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const iface = new Interface(contractABI as any);

      // Submit contract
      const bytecode = arrayify(
        readFileSync(join(__dirname, './test-contract/out/debug/test-contract.bin'))
      );
      const salt = randomBytes(32);
      const transaction = await provider.submitContract(bytecode, salt);
      const data = iface.encodeFunctionData(method, values);
      const response = await provider.submitContractCall(transaction.contractId, data);
      const result = await response.wait();

      expect(BigNumber.from(result.data).toNumber()).toBe(expected);
    });
  });
});
