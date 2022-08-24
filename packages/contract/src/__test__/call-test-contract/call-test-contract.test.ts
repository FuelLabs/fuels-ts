import type { Interface, JsonAbi } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { bn, toHex } from '@fuel-ts/math';
import { Provider } from '@fuel-ts/providers';
import type { Wallet } from '@fuel-ts/wallet';
import { TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import type Contract from '../../contracts/contract';
import ContractFactory from '../../contracts/contract-factory';

import abiJSON from './out/debug/call-test-flat-abi.json';

const contractBytecode = readFileSync(join(__dirname, './out/debug/call-test.bin'));

let contractInstance: Contract;
const deployContract = async (factory: ContractFactory, useCache: boolean = true) => {
  if (contractInstance && useCache) return contractInstance;
  if (!useCache) {
    return factory.deployContract({
      gasPrice: 1,
      bytePrice: 1,
    });
  }
  contractInstance = await factory.deployContract();
  return contractInstance;
};

let walletInstance: Wallet;
const createWallet = async () => {
  if (walletInstance) return walletInstance;
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  walletInstance = await TestUtils.generateTestWallet(provider, [
    [5_000_000, NativeAssetId],
    [5_000_000, '0x0101010101010101010101010101010101010101010101010101010101010101'],
  ]);
  return walletInstance;
};

export const setup = async (abi: JsonAbi | Interface = abiJSON, useCache: boolean = true) => {
  // Create wallet
  const wallet = await createWallet();
  const factory = new ContractFactory(contractBytecode, abi, wallet);
  const contract = await deployContract(factory, useCache);
  return contract;
};

const U64_MAX = bn(2).pow(bn(64)).sub(bn(1));

describe('CallTestContract', () => {
  it.each([0, 1337, U64_MAX.sub(bn(1))])('can call a contract with u64 (%p)', async (num) => {
    const contract = await setup();
    const { value } = await contract.functions.foo(num).call<bigint>();
    expect(value).toEqual(toHex(bn(num).add(bn(1))));
  });

  it.each([
    [{ a: false, b: 0 }],
    [{ a: true, b: 0 }],
    [{ a: false, b: 1337 }],
    [{ a: true, b: 1337 }],
    [{ a: false, b: U64_MAX.sub(bn(1)) }],
    [{ a: true, b: U64_MAX.sub(bn(1)) }],
  ])('can call a contract with structs (%p)', async (struct) => {
    const contract = await setup();
    const { value } = await contract.functions.boo(struct).call();
    expect(value.a).toEqual(!struct.a);
    expect(value.b).toEqual(toHex(bn(struct.b).add(bn(1))));
  });

  it('can call a function with empty arguments', async () => {
    const contract = await setup();

    const { value: value0 } = await contract.functions.barfoo(0).call();
    expect(value0).toEqual(toHex(63));

    const { value: value1 } = await contract.functions.foobar().call();
    expect(value1).toEqual(toHex(63));
  });

  it('function with empty return output configured should resolve undefined', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_void',
        outputs: [{ type: '()', name: 'foo' }],
      },
    ]);

    const { value } = await contract.functions.return_void().call();
    expect(value).toEqual(undefined);
  });

  it('function with empty return should resolve undefined', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_void',
      },
    ]);

    // Call method with no params but with no result and no value on config
    const { value } = await await contract.functions.return_void().call();
    expect(value).toEqual(undefined);
  });

  it.each([
    [
      'foobar_no_params',
      {
        values: [],
        expected: toHex(50),
      },
    ],
    [
      'sum',
      {
        values: [10, 20],
        expected: toHex(30),
      },
    ],
    [
      'sum_test',
      {
        values: [
          10,
          {
            a: 20,
            b: 30,
          },
        ],
        expected: toHex(60),
      },
    ],
    [
      'sum_single',
      {
        values: [
          {
            a: 34,
            b: 34,
          },
        ],
        expected: toHex(68),
      },
    ],
    [
      'sum_multparams',
      {
        values: [10, 10, 10, 10, 40],
        expected: toHex(80),
      },
    ],
    [
      'add_ten',
      {
        values: [
          {
            a: 20,
          },
        ],
        expected: toHex(30),
      },
    ],
    [
      'echo_b256',
      {
        values: ['0x0000000000000000000000000000000000000000000000000000000000000001'],
        expected: '0x0000000000000000000000000000000000000000000000000000000000000001',
      },
    ],
  ])(
    `Test call with multiple arguments and different types -> %s`,
    async (method, { values, expected }) => {
      const contract = await setup();

      const { value } = await contract.functions[method](...values).call();

      expect(value).toBe(expected);
    }
  );

  it('Forward amount value on contract call', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_context_amount',
        outputs: [
          {
            type: 'u64',
          },
        ],
      },
    ]);
    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [1_000_000, NativeAssetId],
      })
      .call();
    expect(value).toBe(toHex(1_000_000));
  });

  it('Forward asset_id on contract call', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_context_asset',
        outputs: [
          {
            type: 'b256',
          },
        ],
      },
    ]);

    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const { value } = await contract.functions
      .return_context_asset()
      .callParams({
        forward: [0, assetId],
      })
      .call();
    expect(value).toBe(assetId);
  });

  it('Forward asset_id on contract simulate call', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_context_asset',
        outputs: [
          {
            type: 'b256',
          },
        ],
      },
    ]);

    const assetId = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const { value } = await contract.functions
      .return_context_asset()
      .callParams({
        forward: [0, assetId],
      })
      .call();
    expect(value).toBe(assetId);
  });

  it('can make multiple calls', async () => {
    const contract = await setup();

    const num = 1337;
    const numC = 10;
    const struct = { a: true, b: 1337 };
    const invocationA = contract.functions.foo(0);
    const multiCallScope = contract.multiCall([invocationA, contract.functions.boo(struct)]);

    // Set arguments of the invocation
    invocationA.setArguments(num);

    // Add invocation to multi-call
    const invocationC = contract.functions.foo(numC);
    multiCallScope.addCall(invocationC);

    async function expectContractCall() {
      // Submit multi-call transaction
      const {
        value: [resultA, resultB, resultC],
      } = await multiCallScope.call();

      expect(resultA).toEqual(toHex(num + 1));
      expect(resultB.a).toEqual(!struct.a);
      expect(resultB.b).toEqual(toHex(struct.b + 1));
      expect(resultC).toEqual(toHex(numC + 1));
    }

    // Test first time
    await expectContractCall();
    // It should be possible to re-execute the
    // tx execution context
    await expectContractCall();
  });
});
