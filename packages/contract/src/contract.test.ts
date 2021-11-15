import { Provider } from '@fuel-ts/providers';
import { expect } from 'chai';
import sinon from 'sinon';

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
  it('generates function methods on a simple contract', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const spy = sinon.spy(provider, 'call');
    const contract = new Contract('address', [jsonFragment], provider);
    const interfaceSpy = sinon.spy(contract.interface, 'encodeFunctionData');

    contract.functions.entry_one(42);
    expect(spy.called).to.be.true;
    expect(interfaceSpy.called).to.be.true;
  });

  it('generates function methods on a complect contract', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const spy = sinon.spy(provider, 'call');
    const contract = new Contract('address', [complexFragment], provider);
    const interfaceSpy = sinon.spy(contract.interface, 'encodeFunctionData');

    contract.functions.tuple_function({
      address: '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      name: 'foo',
    });
  });

  it('assigns a provider if passed', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const contract = new Contract('address', [jsonFragment], provider);

    expect(contract.provider).to.eql(provider);
  });
});
