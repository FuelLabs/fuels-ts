import { expect } from 'chai';
import Contract from './contract';

describe('Contract', () => {
  const jsonFragment = {
    type: 'function',
    inputs: [{ name: 'arg', type: 'u64' }],
    name: 'entry_one',
    outputs: [],
  };
  it('generates function methods on the contract', () => {
    const contract = new Contract([jsonFragment]);

    expect(contract.functions.entry_one(42)).to.eql('0x000000000c36cb9c000000000000002a');
    expect(contract.functions.entry_two).to.be.undefined;
  });
});
