import { BigNumber } from '@ethersproject/bignumber';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { Interface } from '@fuel-ts/abi-coder';
import type { Receipt, ReceiptLog } from '@fuel-ts/transactions';
import { InputType, OutputType, ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { readFileSync } from 'fs';
import { join } from 'path';

import Provider from './provider';
import { getContractId } from './util';

const genBytes32 = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('Provider', () => {
  it('can getVersion()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const version = await provider.getVersion();

    expect(version).toEqual('0.2.1');
  });

  it('can call()', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const callResult = await provider.call({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(Math.floor(Math.random() * 999)),
      gasLimit: BigNumber.from(1000000),
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: Uint8Array.from([]),
    });

    const expectedReceipts: Receipt[] = [
      {
        type: ReceiptType.Log,
        id: '0x0000000000000000000000000000000000000000000000000000000000000000',
        val0: BigNumber.from(202),
        val1: BigNumber.from(186),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(472),
        is: BigNumber.from(464),
      },
      {
        type: ReceiptType.Return,
        id: '0x0000000000000000000000000000000000000000000000000000000000000000',
        val: BigNumber.from(1),
        pc: BigNumber.from(476),
        is: BigNumber.from(464),
      },
      {
        type: ReceiptType.ScriptResult,
        result: BigNumber.from(0),
        gasUsed: BigNumber.from(0),
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
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, 0xCA)
          Opcode::ADDI(0x11, REG_ZERO, 0xBA)
          Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
          Opcode::RET(REG_ONE)
        */
        arrayify('0x504000ca504400ba3341100024040000'),
      scriptData: genBytes32(),
    });

    const result = await response.wait();

    expect(result.receipts).toEqual([
      {
        type: ReceiptType.Log,
        id: '0x0000000000000000000000000000000000000000000000000000000000000000',
        val0: BigNumber.from(202),
        val1: BigNumber.from(186),
        val2: BigNumber.from(0),
        val3: BigNumber.from(0),
        pc: BigNumber.from(472),
        is: BigNumber.from(464),
      },
      {
        type: ReceiptType.Return,
        id: '0x0000000000000000000000000000000000000000000000000000000000000000',
        val: BigNumber.from(1),
        pc: BigNumber.from(476),
        is: BigNumber.from(464),
      },
      {
        type: ReceiptType.ScriptResult,
        result: BigNumber.from(0),
        gasUsed: BigNumber.from(0),
      },
    ]);
  });

  it('can transfer coin', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const from = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const to = genBytes32();
    const color = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const amount = BigNumber.from(1);

    const coins = await provider.getCoins(from, color);

    expect(coins.length).toBeGreaterThan(0);

    const response = await provider.sendTransaction({
      type: TransactionType.Script,
      gasPrice: BigNumber.from(0),
      gasLimit: BigNumber.from(1000000),
      script: '0x24400000',
      scriptData: '0x',
      inputs: [
        {
          type: InputType.Coin,
          ...coins[0],
          witnessIndex: 0,
          maturity: 0,
          predicate: '0x',
          predicateData: '0x',
        },
      ],
      outputs: [
        {
          type: OutputType.Coin,
          to,
          color,
          amount,
        },
      ],
      witnesses: ['0x'],
    });

    await response.wait();

    const toCoins = await provider.getCoins(to, color);

    expect(toCoins).toEqual([expect.objectContaining({ amount, owner: to })]);
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
    const salt = genBytes32();
    const transaction = await provider.submitContract(bytecode, salt);

    expect(transaction).toEqual(
      expect.objectContaining({ contractId: getContractId(bytecode, salt) })
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
    const bytecode = arrayify(readFileSync(join(__dirname, './test-contract/out.bin')));
    const salt = genBytes32();
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
    const bytecode = arrayify(readFileSync(join(__dirname, './test-contract/out.bin')));
    const salt = genBytes32();
    const transaction = await provider.submitContract(bytecode, salt);

    // Call contract
    const fnData = iface.encodeFunctionData('boo', [{ a: true, b: BigNumber.from(0xdeadbeee) }]);

    const response = await provider.submitContractCall(transaction.contractId, fnData);

    const result = await response.wait();

    expect(hexlify(result.data)).toEqual(
      iface.encodeFunctionResult('boo', [{ a: false, b: BigNumber.from(0xdeadbeef) }])
    );
  });
});
