import { getRandomB256 } from '@fuel-ts/address';
import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
import { multiply, toHex, toNumber } from '@fuel-ts/math';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';

import Contract from '../contracts/contract';

import { setup } from './call-test-contract/call-test-contract.test';

const jsonFragment = {
  type: 'function',
  inputs: [{ name: 'arg', type: 'u64' }],
  name: 'entry_one',
  outputs: [],
};

const complexFragment = {
  inputs: [
    {
      name: 'person',
      type: 'tuple',
      components: [
        {
          name: 'name',
          type: 'str[20]',
        },
        {
          name: 'address',
          type: 'address',
        },
      ],
    },
  ],
  name: 'tuple_function',
  outputs: [],
  type: 'function',
};

const AltToken = '0x0101010101010101010101010101010101010101010101010101010101010101';

describe('Contract', () => {
  it('generates function methods on a simple contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const spy = jest.spyOn(provider, 'sendTransaction');
    const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);
    const contract = new Contract(ZeroBytes32, [jsonFragment], wallet);
    const interfaceSpy = jest.spyOn(contract.interface, 'encodeFunctionData');

    try {
      await contract.functions.entry_one(42);
    } catch {
      // The call will fail, but it doesn't matter
    }

    expect(spy).toHaveBeenCalled();
    expect(interfaceSpy).toHaveBeenCalled();
  });

  it('generates function methods on a complex contract', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const spy = jest.spyOn(provider, 'sendTransaction');
    const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);
    const contract = new Contract(ZeroBytes32, [complexFragment], wallet);
    const interfaceSpy = jest.spyOn(contract.interface, 'encodeFunctionData');

    try {
      await contract.functions.tuple_function({
        address: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
        name: 'foo',
      });
    } catch {
      // The call will fail, but it doesn't matter
    }

    expect(spy).toHaveBeenCalled();
    expect(interfaceSpy).toHaveBeenCalled();
  });

  it('assigns a provider if passed', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const contract = new Contract(getRandomB256(), [jsonFragment], provider);

    expect(contract.provider).toEqual(provider);
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    const contract = await setup();

    let failed;
    try {
      await contract.functions
        .foo(1336)
        .txParams({
          gasLimit: 1,
        })
        .call();
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('adds multiple contracts on invocation', async () => {
    const contract = await setup();
    const otherContract = await setup(undefined, false);

    const scope = contract.functions
      .call_external_foo(1336, otherContract.id)
      .addContracts([otherContract.id]);

    expect(scope.transactionRequest.getContractInputs()).toEqual([
      { contractId: contract.id.toB256(), type: 1 },
      { contractId: otherContract.id.toB256(), type: 1 },
    ]);

    expect(scope.transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { value: results } = await scope.call();
    expect(results).toEqual(toHex(1338));
  });

  it('adds multiple contracts on multicalls', async () => {
    const contract = await setup();
    const otherContract = await setup(undefined, false);

    const scope = contract
      .multiCall([
        contract.functions.foo(1336),
        contract.functions.call_external_foo(1336, otherContract.id),
      ])
      .addContracts([otherContract.id]);

    expect(scope.transactionRequest.getContractInputs()).toEqual([
      { contractId: contract.id.toB256(), type: 1 },
      { contractId: otherContract.id.toB256(), type: 1 },
    ]);

    expect(scope.transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { value: results } = await scope.call();
    expect(results).toEqual([toHex(1337), toHex(1338)]);
  });

  it('submits multiple calls', async () => {
    const contract = await setup();

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(results).toEqual([toHex(1337), toHex(1337)]);
  });

  it('should fail to execute multiple calls if gasLimit is too low', async () => {
    const contract = await setup();

    let failed;
    try {
      await contract
        .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
        .txParams({
          gasLimit: 1,
        })
        .call();
    } catch (e) {
      failed = true;
    }

    expect(failed).toEqual(true);
  });

  it('adds multiple contracts on multicalls', async () => {
    const contract = await setup();
    const otherContract = await setup(undefined, false);

    const scope = contract
      .multiCall([contract.functions.foo(1336)])
      .addContracts([otherContract.id]);

    expect(scope.transactionRequest.getContractInputs()).toEqual([
      { contractId: contract.id.toB256(), type: 1 },
      { contractId: otherContract.id.toB256(), type: 1 },
    ]);

    expect(scope.transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { value: results } = await scope.call();
    expect(results).toEqual([toHex(1337)]);
  });

  it('dryRuns multiple calls', async () => {
    const contract = await setup();

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .get();
    expect(results).toEqual([toHex(1337), toHex(1337)]);
  });

  it('simulates multiple calls', async () => {
    const contract = await setup();

    const { value, callResult, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();
    expect(value).toEqual([toHex(1337), toHex(1337)]);
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
    expect(callResult.receipts).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('Returns gasUsed and transactionId', async () => {
    const contract = await setup();

    const { transactionId, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(transactionId).toBeTruthy();
    expect(toNumber(gasUsed)).toBeGreaterThan(0);
  });

  it('Single call with forwarding a alt token', async () => {
    const contract = await setup();
    const { value } = await contract.functions
      .return_context_amount()
      .callParams({
        forward: [200, AltToken],
        gasLimit: 1000000,
      })
      .txParams({
        gasPrice: 1,
        bytePrice: 1,
        gasLimit: 2000000,
      })
      .call<string>();
    expect(value).toEqual(toHex(200));
  });

  it('MultiCall with multiple forwarding', async () => {
    const contract = await setup();

    const { value } = await contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, NativeAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, AltToken],
        }),
        contract.functions.return_context_asset().callParams({
          forward: [0, AltToken],
        }),
      ])
      .txParams({
        gasPrice: 1,
        bytePrice: 1,
        gasLimit: 2000000,
      })
      .call<[string, string, string]>();
    expect(value).toEqual([toHex(100), toHex(200), AltToken]);
  });

  it('Check if gas per call is lower than transaction', async () => {
    const contract = await setup();

    await expect(async () => {
      await contract
        .multiCall([
          contract.functions.return_context_amount().callParams({
            forward: [100, NativeAssetId],
            gasLimit: 100,
          }),
          contract.functions.return_context_amount().callParams({
            forward: [200, AltToken],
            gasLimit: 200,
          }),
        ])
        .txParams({
          gasPrice: 1,
          bytePrice: 1,
          gasLimit: 100,
        })
        .call<[string, string, string]>();
    }).rejects.toThrowError(
      "Transaction gasLimit can't be lower than the sum of the forwarded gas of each call"
    );
  });

  it('can forward gas to multicall calls', async () => {
    const contract = await setup();

    const { value } = await contract
      .multiCall([
        contract.functions.return_context_gas().callParams({
          // Forward only 500_000 gas
          gasLimit: 500_000,
        }),
        contract.functions.return_context_gas().callParams({
          // Forward all gas
          gasLimit: 0,
        }),
      ])
      .txParams({
        gasPrice: 1,
        bytePrice: 1,
        gasLimit: 1_000_000,
      })
      .call<[string, string]>();

    // Allow values to be off by 2% since we don't have exact values
    const allowedError = 0.02;

    expect(Number(value[0])).toBeGreaterThanOrEqual(500_000 * allowedError);
    expect(Number(value[0])).toBeLessThanOrEqual(500_000);

    expect(Number(value[1])).toBeGreaterThanOrEqual(1_000_000 * allowedError);
    expect(Number(value[1])).toBeLessThanOrEqual(1_000_000);
  });

  it('Get transaction cost', async () => {
    const contract = await setup();

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, NativeAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, AltToken],
      }),
    ]);
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.bytePrice)).toBe(0);
    expect(toNumber(transactionCost.gasPrice)).toBe(0);
    expect(toNumber(transactionCost.fee)).toBeGreaterThanOrEqual(0);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(1000);

    const { value } = await invocationScope
      .txParams({
        bytePrice: transactionCost.bytePrice,
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    expect(value).toEqual([toHex(100), toHex(200)]);
  });

  it('Get transaction cost with bytePrice and gasPrice 1', async () => {
    const contract = await setup();

    const invocationScope = contract
      .multiCall([
        contract.functions.return_context_amount().callParams({
          forward: [100, NativeAssetId],
        }),
        contract.functions.return_context_amount().callParams({
          forward: [200, AltToken],
        }),
      ])
      .txParams({
        gasPrice: 1,
        bytePrice: 1,
      });
    // Get transaction cost using bytePrice and gasPrice from
    // invocation scope
    const transactionCost = await invocationScope.getTransactionCost();

    expect(toNumber(transactionCost.bytePrice)).toBe(1);
    expect(toNumber(transactionCost.gasPrice)).toBe(1);
    expect(toNumber(transactionCost.fee)).toBeGreaterThanOrEqual(2);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(1000);

    // Test that gasUsed is correctly calculated
    // and can be used as gasLimit
    const { value } = await invocationScope
      .txParams({
        bytePrice: transactionCost.bytePrice,
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    expect(value).toEqual([toHex(100), toHex(200)]);
  });

  it('Get transaction cost with bytePrice and gasPrice 2', async () => {
    const contract = await setup();

    const invocationScope = contract.multiCall([
      contract.functions.return_context_amount().callParams({
        forward: [100, NativeAssetId],
      }),
      contract.functions.return_context_amount().callParams({
        forward: [200, AltToken],
      }),
    ]);
    // Get transaction cost using bytePrice and gasPrice
    // override by SDK user
    const transactionCost = await invocationScope.getTransactionCost({
      gasPrice: 2,
      bytePrice: 2,
    });

    expect(toNumber(transactionCost.bytePrice)).toBe(2);
    expect(toNumber(transactionCost.gasPrice)).toBe(2);
    expect(toNumber(transactionCost.fee)).toBeGreaterThanOrEqual(4);
    expect(toNumber(transactionCost.gasUsed)).toBeGreaterThan(1000);

    // Test that gasUsed is correctly calculated
    // and can be used as gasLimit
    const { value } = await invocationScope
      .txParams({
        bytePrice: transactionCost.bytePrice,
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[string, string]>();

    expect(value).toEqual([toHex(100), toHex(200)]);
  });

  it('Fail before submit if gasLimit is lower than gasUsed', async () => {
    const contract = await setup();

    const invocationScope = contract.functions.return_context_amount().callParams({
      forward: [100, NativeAssetId],
    });
    const { gasUsed } = await invocationScope.getTransactionCost({
      tolerance: 0,
    });

    const gasLimit = multiply(gasUsed, 0.5);
    await expect(async () => {
      await invocationScope
        .txParams({
          gasLimit,
        })
        .call<string>();
    }).rejects.toThrowError(`gasLimit(${gasLimit}) is lower than the required (${gasUsed})`);
  });

  it('calls array functions', async () => {
    const contract = await setup();

    const { value: arrayBoolean } = await contract.functions
      .take_array_boolean([true, false, false])
      .call();

    expect(arrayBoolean).toEqual(true);

    const { value: arrayNumber } = await contract.functions.take_array_number([1, 2, 3]).call();

    expect(arrayNumber).toEqual(toHex(1));

    const { value: arrayReturnShuffle } = await contract.functions
      .take_array_string_shuffle(['abc', 'efg', 'hij'])
      .call();

    expect(arrayReturnShuffle).toEqual(['hij', 'abc', 'efg']);

    const { value: arrayReturnSingle } = await contract.functions
      .take_array_string_return_single(['abc', 'efg', 'hij'])
      .call();

    expect(arrayReturnSingle).toEqual(['abc']);

    const { value: arrayReturnSingleElement } = await contract.functions
      .take_array_string_return_single_element(['abc', 'efg', 'hij'])
      .call();

    expect(arrayReturnSingleElement).toEqual('abc');
  });

  it('calls enum functions', async () => {
    const contract = await setup();

    const { value: enumB256ReturnValue } = await contract.functions
      .take_b256_enum({
        Value: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      })
      .call();

    expect(enumB256ReturnValue).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );

    const { value: enumB256ReturnData } = await contract.functions
      .take_b256_enum({
        Data: '0x1111111111111111111111111111111111111111111111111111111111111111',
      })
      .call();

    expect(enumB256ReturnData).toEqual(
      '0x1111111111111111111111111111111111111111111111111111111111111111'
    );

    const { value: enumBoolReturnValue } = await contract.functions
      .take_bool_enum({
        Value: true,
      })
      .call();

    expect(enumBoolReturnValue).toEqual(true);

    const { value: enumBoolReturnData } = await contract.functions
      .take_bool_enum({
        Data: false,
      })
      .call();

    expect(enumBoolReturnData).toEqual(false);

    const { value: enumStrReturnValue } = await contract.functions
      .take_string_enum({
        Value: 'abc',
      })
      .call();

    expect(enumStrReturnValue).toEqual('abc');

    const { value: enumStrReturnData } = await contract.functions
      .take_string_enum({
        Data: 'efg',
      })
      .call();

    expect(enumStrReturnData).toEqual('efg');
  });
});
