import { randomBytes } from '@ethersproject/random';
import { Provider } from '@fuel-ts/providers';
import { readFileSync } from 'fs';
import { join } from 'path';

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
    const contract = new Contract(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      [jsonFragment],
      provider
    );
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
    const contract = new Contract(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      [complexFragment],
      provider
    );
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

  it('can call contract method', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Deploy contract
    const bytecode = readFileSync(join(__dirname, './test-contract/out/debug/test-contract.bin'));
    const salt = randomBytes(32);
    const { contractId } = await provider.submitContract(bytecode, salt);

    // Create Contract instance
    const contractAbi = [
      {
        type: 'function',
        name: 'initialize_counter',
        inputs: [{ name: 'value', type: 'u64' }],
        outputs: [{ name: 'ret', type: 'u64' }],
      },
      {
        type: 'function',
        name: 'increment_counter',
        inputs: [{ name: 'amount', type: 'u64' }],
        outputs: [{ name: 'ret', type: 'u64' }],
      },
      {
        type: 'function',
        name: 'counter',
        inputs: [{ name: 'amount', type: '()' }],
        outputs: [{ name: '', type: 'u64' }],
      },
    ];
    const contract = new Contract(contractId, contractAbi, provider);

    // Call contract
    const initializeResult = await contract.functions.initialize_counter(1300);
    expect(initializeResult.toNumber()).toEqual(1300);
    const incrementResult = await contract.functions.increment_counter(37);
    expect(incrementResult.toNumber()).toEqual(1337);

    const count = await contract.functions.counter();
    expect(count.toNumber()).toEqual(1337);
  });
});
