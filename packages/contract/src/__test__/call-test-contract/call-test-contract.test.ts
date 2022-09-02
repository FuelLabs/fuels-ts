import { NativeAssetId } from '@fuel-ts/constants';
import { readFileSync } from 'fs';
import { join } from 'path';

import { createSetupConfig } from '../test-utils';

import abiJSON from './out/debug/call-test-flat-abi.json';

const contractBytecode = readFileSync(join(__dirname, './out/debug/call-test.bin'));

const setupContract = createSetupConfig({
  contractBytecode,
  abi: abiJSON,
  cache: true,
});

const U64_MAX = 2n ** 64n - 1n;

describe('CallTestContract', () => {
  it.each([0n, 1337n, U64_MAX - 1n])('can call a contract with u64 (%p)', async (num) => {
    const contract = await setupContract();
    const { value } = await contract.functions.foo(num).call<bigint>();
    expect(value).toEqual(num + 1n);
  });

  it.each([
    [{ a: false, b: 0n }],
    [{ a: true, b: 0n }],
    [{ a: false, b: 1337n }],
    [{ a: true, b: 1337n }],
    [{ a: false, b: U64_MAX - 1n }],
    [{ a: true, b: U64_MAX - 1n }],
  ])('can call a contract with structs (%p)', async (struct) => {
    const contract = await setupContract();
    const { value } = await contract.functions.boo(struct).call();
    expect(value.a).toEqual(!struct.a);
    expect(value.b).toEqual(struct.b + 1n);
  });

  it('can call a function with empty arguments', async () => {
    const contract = await setupContract();

    const { value: value0 } = await contract.functions.barfoo(0).call();
    expect(value0).toEqual(63n);

    const { value: value1 } = await contract.functions.foobar().call();
    expect(value1).toEqual(63n);
  });

  it('function with empty return output configured should resolve undefined', async () => {
    const contract = await setupContract({
      abi: [
        {
          type: 'function',
          name: 'return_void',
          outputs: [{ type: '()', name: 'foo' }],
        },
      ],
    });

    const { value } = await contract.functions.return_void().call();
    expect(value).toEqual(undefined);
  });

  it('function with empty return should resolve undefined', async () => {
    const contract = await setupContract({
      abi: [
        {
          type: 'function',
          name: 'return_void',
        },
      ],
    });

    // Call method with no params but with no result and no value on config
    const { value } = await await contract.functions.return_void().call();
    expect(value).toEqual(undefined);
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
      const contract = await setupContract();

      const { value } = await contract.functions[method](...values).call();

      expect(value).toBe(expected);
    }
  );

  it('Forward amount value on contract call', async () => {
    const contract = await setupContract({
      abi: [
        {
          type: 'function',
          name: 'return_context_amount',
          outputs: [
            {
              type: 'u64',
            },
          ],
        },
      ],
    });
    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [1_000_000, NativeAssetId],
      })
      .call();
    expect(value).toBe(1_000_000n);
  });

  it('Forward asset_id on contract call', async () => {
    const contract = await setupContract({
      abi: [
        {
          type: 'function',
          name: 'return_context_amount',
          outputs: [
            {
              type: 'u64',
            },
          ],
        },
      ],
    });

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
    const contract = await setupContract({
      abi: [
        {
          type: 'function',
          name: 'return_context_asset',
          outputs: [
            {
              type: 'b256',
            },
          ],
        },
      ],
    });

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
    const contract = await setupContract();

    const num = 1337n;
    const numC = 10n;
    const struct = { a: true, b: 1337n };
    const invocationA = contract.functions.foo(0n);
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

      expect(resultA).toEqual(num + 1n);
      expect(resultB.a).toEqual(!struct.a);
      expect(resultB.b).toEqual(struct.b + 1n);
      expect(resultC).toEqual(numC + 1n);
    }

    // Test first time
    await expectContractCall();
    // It should be possible to re-execute the
    // tx execution context
    await expectContractCall();
  });
});
