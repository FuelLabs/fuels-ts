import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
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

  it.only('should fail to execute call if gasLimit is too low', async () => {
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
          forward: [200, '0x0101010101010101010101010101010101010101010101010101010101010101'],
        }),
        contract.functions.return_context_asset().callParams({
          forward: [0, '0x0101010101010101010101010101010101010101010101010101010101010101'],
        }),
      ])
      .txParams({
        gasPrice: 1,
        bytePrice: 1,
        gasLimit: 2000000,
      })
      .call<[bigint, bigint, string]>();
    expect(value).toEqual([
      100n,
      200n,
      '0x0101010101010101010101010101010101010101010101010101010101010101',
    ]);
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
            forward: [200, '0x0101010101010101010101010101010101010101010101010101010101010101'],
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
});
