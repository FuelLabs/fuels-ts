import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';

import { setup } from './call-test-contract/call-test-contract.test';
import Contract from './contract';

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
      await contract.submit.entry_one(42);
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
      await contract.submit.tuple_function({
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

  it('submits multiple calls', async () => {
    const contract = await setup();

    const results = await contract.submitMulticall([
      contract.prepareCall.foo(1336),
      contract.prepareCall.foo(1336),
    ]);
    expect(results).toEqual([1337n, 1337n]);
  });

  it('dryRuns multiple calls', async () => {
    const contract = await setup();

    const results = await contract.dryRunMulticall([
      contract.prepareCall.foo(1336),
      contract.prepareCall.foo(1336),
    ]);
    expect(results).toEqual([1337n, 1337n]);
  });

  it('simulates multiple calls', async () => {
    const contract = await setup();

    const result = await contract.simulateMulticall([
      contract.prepareCall.foo(1336),
      contract.prepareCall.foo(1336),
    ]);
    expect(result).toEqual({
      receipts: expect.arrayContaining([expect.any(Object)]),
    });
  });

  it('MultiCall with multiple forwarding', async () => {
    const contract = await setup();

    const result = await contract.simulateMulticall(
      [
        contract.prepareCall.return_context_amount({
          forward: [100, NativeAssetId],
          gasLimit: 1000000,
          gasPrice: 1,
          bytePrice: 1,
        }),
        contract.prepareCall.return_context_amount({
          forward: [200, '0x0101010101010101010101010101010101010101010101010101010101010101'],
          gasLimit: 1000000,
          gasPrice: 1,
          bytePrice: 1,
        }),
      ],
      {
        gasPrice: 1,
        bytePrice: 1,
        gasLimit: 2000000,
      }
    );
    expect(result).toEqual({
      receipts: expect.arrayContaining([expect.any(Object)]),
    });
  });
});
