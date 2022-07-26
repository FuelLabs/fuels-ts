import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
import { multiply } from '@fuel-ts/math';
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
    const contract = new Contract('address', [jsonFragment], provider);

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
      { contractId: contract.id, type: 1 },
      { contractId: otherContract.id, type: 1 },
    ]);

    expect(scope.transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { value: results } = await scope.call();
    expect(results).toEqual(1338n);
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
      { contractId: contract.id, type: 1 },
      { contractId: otherContract.id, type: 1 },
    ]);

    expect(scope.transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { value: results } = await scope.call();
    expect(results).toEqual([1337n, 1338n]);
  });

  it('submits multiple calls', async () => {
    const contract = await setup();

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(results).toEqual([1337n, 1337n]);
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
      { contractId: contract.id, type: 1 },
      { contractId: otherContract.id, type: 1 },
    ]);

    expect(scope.transactionRequest.getContractOutputs()).toEqual([
      { type: 1, inputIndex: 0 },
      { type: 1, inputIndex: 1 },
    ]);

    const { value: results } = await scope.call();
    expect(results).toEqual([1337n]);
  });

  it('dryRuns multiple calls', async () => {
    const contract = await setup();

    const { value: results } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .get();
    expect(results).toEqual([1337n, 1337n]);
  });

  it('simulates multiple calls', async () => {
    const contract = await setup();

    const { value, callResult, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();
    expect(value).toEqual([1337n, 1337n]);
    expect(gasUsed).toBeGreaterThan(0);
    expect(callResult.receipts).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('Returns gasUsed and transactionId', async () => {
    const contract = await setup();

    const { transactionId, gasUsed } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();
    expect(transactionId).toBeTruthy();
    expect(gasUsed).toBeGreaterThan(0);
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
      .call<[bigint, bigint, string]>();
    expect(value).toEqual([100n, 200n, AltToken]);
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
        .call<[bigint, bigint, string]>();
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
      .call<[bigint, bigint]>();

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

    expect(transactionCost.bytePrice).toBe(0n);
    expect(transactionCost.gasPrice).toBe(0n);
    expect(transactionCost.fee).toBeGreaterThanOrEqual(0n);
    expect(transactionCost.gasUsed).toBeGreaterThan(1000n);

    const { value } = await invocationScope
      .txParams({
        bytePrice: transactionCost.bytePrice,
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[bigint, bigint]>();

    expect(value).toEqual([100n, 200n]);
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

    expect(transactionCost.bytePrice).toBe(1n);
    expect(transactionCost.gasPrice).toBe(1n);
    expect(transactionCost.fee).toBeGreaterThanOrEqual(2n);
    expect(transactionCost.gasUsed).toBeGreaterThan(1000n);

    // Test that gasUsed is correctly calculated
    // and can be used as gasLimit
    const { value } = await invocationScope
      .txParams({
        bytePrice: transactionCost.bytePrice,
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[bigint, bigint]>();

    expect(value).toEqual([100n, 200n]);
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

    expect(transactionCost.bytePrice).toBe(2n);
    expect(transactionCost.gasPrice).toBe(2n);
    expect(transactionCost.fee).toBeGreaterThanOrEqual(4n);
    expect(transactionCost.gasUsed).toBeGreaterThan(1000n);

    // Test that gasUsed is correctly calculated
    // and can be used as gasLimit
    const { value } = await invocationScope
      .txParams({
        bytePrice: transactionCost.bytePrice,
        gasPrice: transactionCost.gasPrice,
        gasLimit: transactionCost.gasUsed,
      })
      .call<[bigint, bigint]>();

    expect(value).toEqual([100n, 200n]);
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
        .call<bigint>();
    }).rejects.toThrowError(`gasLimit(${gasLimit}) is lower than the required (${gasUsed})`);
  });
});
