import { BigNumber } from '@ethersproject/bignumber';
import { expect } from 'chai';

import FunctionFragment from './fragments/function-fragment';
import Interface from './interface';

describe('Interface', () => {
  const jsonFragment = {
    type: 'function',
    inputs: [{ name: 'arg', type: 'u64' }],
    name: 'entry_one',
    outputs: [],
  };
  const fragment = FunctionFragment.fromObject(jsonFragment);
  let functionInterface: Interface;

  it('encodes the function name', () => {
    let encoded = Interface.getSighash('entry_one(u64)');
    expect(encoded).to.eql('0x000000000c36cb9c');
    encoded = Interface.getSighash(fragment);
    expect(encoded).to.eql('0x000000000c36cb9c');
  });

  it('removes duplicates if function signatures are repeated', () => {
    functionInterface = new Interface([jsonFragment, jsonFragment]);
    expect(Object.values(functionInterface.functions)).lengthOf(1);
  });

  it('can retreive a fragment', () => {
    functionInterface = new Interface([jsonFragment]);

    expect(Object.values(functionInterface.functions)).lengthOf(1);

    expect(functionInterface.getFunction('entry_one(u64)')).to.be.eql(fragment);
    expect(functionInterface.getFunction('entry_one')).to.be.eql(fragment);
    expect(functionInterface.getFunction('0x000000000c36cb9c')).to.be.eql(fragment);
  });

  it('can encode and decodes function data with simple values', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(functionInterface.encodeFunctionData('entry_one', [42])).to.eql(
      '0x000000000c36cb9c000000000000002a'
    );
    expect(
      functionInterface.decodeFunctionData('entry_one', '0x000000000c36cb9c000000000000002a')
    ).to.eql([BigNumber.from(42)]);
  });

  it('can encode and decodes function data with array values', () => {
    functionInterface = new Interface([
      {
        type: 'function',
        inputs: [
          {
            name: 'arg',
            type: 'u16[3]',
          },
        ],
        name: 'takes_array',
        outputs: [
          {
            name: '',
            type: 'u16[2]',
          },
        ],
      },
    ]);
    expect(functionInterface.encodeFunctionData('takes_array', [[1, 2]])).to.eql(
      '0x00000000f0b8786400000000000000010000000000000002'
    );
  });

  it('can encode and decodes function data with empty values', () => {
    functionInterface = new Interface([
      { type: 'function', inputs: [], name: 'entry_one', outputs: [] },
    ]);
    expect(functionInterface.encodeFunctionData('entry_one', [])).to.eql('0x000000008a521397');
    expect(functionInterface.decodeFunctionData('entry_one', '0x000000008a521397')).to.eql([]);
  });

  it('raises an error if the function is not found', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(() => functionInterface.encodeFunctionData('entry_two', [42])).to.throw(
      'function entry_two not found'
    );
    expect(() =>
      functionInterface.decodeFunctionData('entry_two', '0x00000000000000000000000000000000')
    ).to.throw('function entry_two not found');
  });

  it('raises an error if the arguments do not match the function input types', () => {
    expect(() => functionInterface.encodeFunctionData('entry_one', [true])).to.throw('Invalid u64');
    expect(() => functionInterface.encodeFunctionData('entry_one', [11, 11])).to.throw(
      'Types/values length mismatch'
    );
    expect(() =>
      functionInterface.decodeFunctionData('entry_one', '0x1111111111111111000000000000002a')
    ).to.throw('data signature does not match function entry_one');
  });
});
