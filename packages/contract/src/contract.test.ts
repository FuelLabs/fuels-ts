import { Provider } from '@fuel-ts/providers';
import { expect } from 'chai';
import sinon from 'sinon';

import Contract from './contract';

describe('Contract', () => {
  const jsonFragment = {
    type: 'function',
    inputs: [{ name: 'arg', type: 'u64' }],
    name: 'entry_one',
    outputs: [],
  };
  it('generates function methods on the contract', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const spy = sinon.spy(provider, 'call');
    const contract = new Contract('address', [jsonFragment], provider);
    const interfaceSpy = sinon.spy(contract.interface, 'encodeFunctionData');

    contract.functions.entry_one(42);
    expect(spy.called).to.be.true;
    expect(interfaceSpy.called).to.be.true;
  });

  it('assigns a provider if passed', () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const contract = new Contract('address', [jsonFragment], provider);

    expect(contract.provider).to.eql(provider);
  });
});
