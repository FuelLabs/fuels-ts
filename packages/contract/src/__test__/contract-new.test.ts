import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';

import Contract from '../contract-new';

import { setup } from './call-test-contract/call-test-contract-new.test';

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
      await contract.functions.entry_one<[bigint], bigint>(42n).call();
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
      await contract.functions
        .tuple_function({
          address: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
          name: 'foo',
        })
        .call();
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
    const { value } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .call();

    expect(value).toEqual([1337n, 1337n]);
  });

  it('dryRuns multiple calls', async () => {
    const contract = await setup();
    const { value } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .get();

    expect(value).toEqual([1337n, 1337n]);
  });

  it('simulates multiple calls', async () => {
    const contract = await setup();
    const { value } = await contract
      .multiCall([contract.functions.foo(1336), contract.functions.foo(1336)])
      .simulate();

    expect(value).toEqual([1337n, 1337n]);
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
      ])
      .txParams({
        gasPrice: 1,
        bytePrice: 1,
        gasLimit: 2000000,
      })
      .simulate();

    expect(value).toEqual([100n, 200n]);
  });
});
