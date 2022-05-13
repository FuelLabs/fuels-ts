import type { Interface, JsonAbi } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import type { ScriptTransactionRequest } from '@fuel-ts/providers';
import { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';
import { seedWallet } from '@fuel-ts/wallet/dist/test-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

import ContractFactory from '../contract-factory';

import abiJSON from './out/debug/call-test-abi.json';

const setup = async (abi: JsonAbi | Interface = abiJSON) => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');

  // Create wallet
  const wallet = Wallet.generate({ provider });
  await seedWallet(wallet, [[5_000_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(join(__dirname, './out/debug/call-test.bin'));
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

describe('TestContractTwo', () => {
  it('can call a contract with structs', async () => {
    const contract = await setup();

    // Call contract
    const result = await contract.functions.boo({ a: true, b: BigInt(0xdeadbeee) });

    expect(result.a).toEqual(false);
    expect(result.b).toEqual(BigInt(0xdeadbeef));
  });

  it('can call a function with empty arguments', async () => {
    const contract = await setup();

    let result = await contract.functions.barfoo(0);
    expect(result).toEqual(63n);

    result = await contract.functions.foobar();
    expect(result).toEqual(63n);
  });

  it('function with empty return output configured should resolve undefined', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_void',
        outputs: [{ type: '()', name: 'foo' }],
      },
    ]);

    const result = await contract.functions.return_void();
    expect(result).toEqual(undefined);
  });

  it('function with empty return should resolve undefined', async () => {
    const contract = await setup([
      {
        type: 'function',
        name: 'return_void',
      },
    ]);

    // Call method with no params but with no result and no value on config
    const result = await await contract.functions.return_void();
    expect(result).toEqual(undefined);
  });

  it.each([
    [
      'foobar_no_params',
      {
        values: [],
        expected: 50n,
      },
    ],
    [
      'sum',
      {
        values: [10, 20],
        expected: 30n,
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
        expected: 60n,
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
        expected: 68n,
      },
    ],
    [
      'sum_multparams',
      {
        values: [10, 10, 10, 10, 40],
        expected: 80n,
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
        expected: 30n,
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

      const result = await contract.functions[method](...values);

      expect(result).toBe(expected);
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
    const result = await contract.functions.return_context_amount({
      forward: [1_000_000, NativeAssetId],
    });
    expect(result).toBe(1_000_000n);
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
    const result = await contract.functions.return_context_asset({
      forward: [0, assetId],
    });
    expect(result).toBe(assetId);
  });

  it('Test if transformRequest is called before sendTransaction', async () => {
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
    const methods = {
      transformRequest: async (request: ScriptTransactionRequest) => request,
    };
    const spyTransformRequest = jest.spyOn(methods, 'transformRequest');

    await contract.functions.return_context_asset({
      forward: [0, assetId],
      transformRequest: methods.transformRequest,
    });

    expect(spyTransformRequest).toHaveBeenCalled();
  });
});
