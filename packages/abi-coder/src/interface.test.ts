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

  it('removes duplicates if function signatures are repeated', () => {
    functionInterface = new Interface([jsonFragment, jsonFragment]);
    expect(Object.values(functionInterface.functions)).toHaveLength(1);
  });

  it('can retrieve a function fragment', () => {
    functionInterface = new Interface([jsonFragment]);

    expect(Object.values(functionInterface.functions)).toHaveLength(1);

    expect(functionInterface.getFunction('entry_one(u64)')).toEqual(fragment);
    expect(functionInterface.getFunction('entry_one')).toEqual(fragment);
    expect(functionInterface.getFunction('0x000000000c36cb9c')).toEqual(fragment);
  });

  it('raises an error if the function is not found', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(() => functionInterface.encodeFunctionData('entry_two', [42])).toThrow(
      'function entry_two not found'
    );
    expect(() =>
      functionInterface.decodeFunctionData('entry_two', '0x00000000000000000000000000000000')
    ).toThrow('function entry_two not found');
  });

  it('raises an error if the arguments do not match the function input types', () => {
    expect(() => functionInterface.encodeFunctionData('entry_one', [11, 11])).toThrow(
      'Types/values length mismatch'
    );
  });
});
