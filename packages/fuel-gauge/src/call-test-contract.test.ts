import type { Contract } from 'fuels';
import { BN, bn, toHex } from 'fuels';
import { ASSET_A } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

function setupContract() {
  return launchTestContract({ factory: CallTestContractFactory });
}
const U64_MAX = bn(2).pow(64).sub(1);

/**
 * @group node
 * @group browser
 */
describe('CallTestContract', () => {
  it.each([0, 1337, U64_MAX.sub(1)])('can call a contract with u64 (%p)', async (num) => {
    using contract = await setupContract();
    const { waitForResult } = await contract.functions.foo(num).call();
    const { value } = await waitForResult();
    expect(value.toHex()).toEqual(bn(num).add(1).toHex());
  });

  it.each([
    [{ a: false, b: 0 }],
    [{ a: true, b: 0 }],
    [{ a: false, b: 1337 }],
    [{ a: true, b: 1337 }],
    [{ a: false, b: U64_MAX.sub(1) }],
    [{ a: true, b: U64_MAX.sub(1) }],
  ])('can call a contract with structs (%p)', async (struct) => {
    using contract = await setupContract();
    const { waitForResult } = await contract.functions.boo(struct).call();
    const { value } = await waitForResult();
    expect(value.a).toEqual(!struct.a);
    expect(value.b.toHex()).toEqual(bn(struct.b).add(1).toHex());
  });

  it('can call a function with empty arguments', async () => {
    using contract = await setupContract();

    const call1 = await contract.functions.empty().call();
    const { value: empty } = await call1.waitForResult();
    expect(empty.toHex()).toEqual(toHex(63));

    const call2 = await contract.functions.empty_then_value(undefined, 35).call();
    const { value: emptyThenValue } = await call2.waitForResult();
    expect(emptyThenValue.toHex()).toEqual(toHex(63));

    const call3 = await contract.functions.value_then_empty(35).call();
    const { value: valueThenEmpty } = await call3.waitForResult();
    expect(valueThenEmpty.toHex()).toEqual(toHex(63));

    const call4 = await contract.functions.value_then_empty_then_value(35, undefined, 35).call();
    const { value: valueThenEmptyThenValue } = await call4.waitForResult();
    expect(valueThenEmptyThenValue.toHex()).toEqual(toHex(63));
  });

  it('function with empty return should resolve undefined', async () => {
    using contract = await setupContract();

    // Call method with no params but with no result and no value on config
    const { waitForResult } = await contract.functions.return_void().call();
    const { value } = await waitForResult();
    expect(value).toEqual(undefined);
  });

  it.each([
    [
      'no_params',
      {
        values: [],
        expected: bn(50),
      },
    ],
    [
      'sum',
      {
        values: [10, 20],
        expected: bn(30),
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
        expected: bn(60),
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
        expected: bn(68),
      },
    ],
    [
      'sum_multparams',
      {
        values: [10, 10, 10, 10, 40],
        expected: bn(80),
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
        expected: bn(30),
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
      // Type cast to Contract because of the dynamic nature of the test
      // But the function names are type-constrained to correct Contract's type
      using contract = await setupContract();

      const { waitForResult } = await (contract as Contract).functions[method](...values).call();
      const { value } = await waitForResult();

      if (BN.isBN(value)) {
        expect(toHex(value)).toBe(toHex(expected));
      } else {
        expect(value).toBe(expected);
      }
    }
  );

  it('Forward amount value on contract call', async () => {
    using contract = await setupContract();
    const baseAssetId = await contract.provider.getBaseAssetId();
    const { waitForResult } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [1_000_000, baseAssetId],
      })
      .call();

    const { value } = await waitForResult();

    expect(value.toHex()).toBe(bn(1_000_000).toHex());
  });

  it('Forward asset_id on contract call', async () => {
    using contract = await setupContract();

    const assetId = ASSET_A;
    const { waitForResult } = await contract.functions
      .return_context_asset()
      .callParams({
        forward: [0, assetId],
      })
      .call();

    const { value } = await waitForResult();

    expect(value).toBe(assetId);
  });

  it('Forward asset_id on contract simulate call', async () => {
    using contract = await setupContract();

    const assetId = ASSET_A;
    const { waitForResult } = await contract.functions
      .return_context_asset()
      .callParams({
        forward: [0, assetId],
      })
      .call();

    const { value } = await waitForResult();

    expect(value).toBe(assetId);
  });

  it('can make multiple calls', async () => {
    using contract = await setupContract();

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
      const { waitForResult } = await multiCallScope.call();

      // Wait for the result
      const {
        value: [resultA, resultB, resultC],
      } = await waitForResult();

      expect(resultA.toHex()).toEqual(bn(num).add(1).toHex());
      expect(resultB.a).toEqual(!struct.a);
      expect(resultB.b.toHex()).toEqual(bn(struct.b).add(1).toHex());
      expect(resultC.toHex(0)).toEqual(bn(numC).add(1).toHex());
    }

    // Test first time
    await expectContractCall();
    // It should be possible to re-execute the
    // tx execution context
    await expectContractCall();
  });

  it('Calling a simple contract function does only one dry run', async () => {
    using contract = await setupContract();
    const dryRunSpy = vi.spyOn(contract.provider.operations, 'dryRun');
    await contract.functions.no_params().call();
    expect(dryRunSpy).toHaveBeenCalledOnce();
  });

  it('Simulating a simple contract function does two dry runs', async () => {
    using contract = await setupContract();
    const dryRunSpy = vi.spyOn(contract.provider.operations, 'dryRun');

    await contract.functions.no_params().simulate();
    expect(dryRunSpy).toHaveBeenCalledTimes(2);
  });
});
