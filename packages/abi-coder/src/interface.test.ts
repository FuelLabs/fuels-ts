import { hexlify } from '@ethersproject/bytes';
import { toHex } from '@fuel-ts/math';

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

  it('can retrieve a fragment', () => {
    functionInterface = new Interface([jsonFragment]);

    expect(Object.values(functionInterface.functions)).toHaveLength(1);

    expect(functionInterface.getFunction('entry_one(u64)')).toEqual(fragment);
    expect(functionInterface.getFunction('entry_one')).toEqual(fragment);
    expect(functionInterface.getFunction('0x000000000c36cb9c')).toEqual(fragment);
  });

  it('can encode and decode function data with simple values', () => {
    functionInterface = new Interface([jsonFragment]);
    expect(hexlify(functionInterface.encodeFunctionData('entry_one', [42]))).toEqual(
      '0x000000000c36cb9c0000000000000000000000000000002a'
    );
    const decoded = functionInterface.decodeFunctionData(
      'entry_one',
      '0x000000000c36cb9c0000000000000000000000000000002a'
    );
    expect(decoded.length).toEqual(1);
    expect(decoded[0].toHex()).toEqual(toHex(42));
  });

  it('can encode and decode function data with array values', () => {
    functionInterface = new Interface([
      {
        type: 'function',
        inputs: [
          {
            name: 'arg',
            type: '[u16; 3]',
            components: [
              {
                name: '__array_element',
                type: 'u16',
              },
            ],
          },
        ],
        name: 'takes_array',
        outputs: [
          {
            name: '',
            type: '[u16; 2]',
            components: [
              {
                name: '__array_element',
                type: 'u16',
              },
            ],
          },
        ],
      },
    ]);
    expect(hexlify(functionInterface.encodeFunctionData('takes_array', [[1, 2, 3]]))).toEqual(
      '0x00000000101cbeb50000000000000001000000000000000100000000000000020000000000000003'
    );
  });

  it('can encode and decode function data with empty values', () => {
    functionInterface = new Interface([
      { type: 'function', inputs: [], name: 'entry_one', outputs: [] },
    ]);
    expect(hexlify(functionInterface.encodeFunctionData('entry_one', []))).toEqual(
      '0x000000008a521397'
    );
    expect(functionInterface.decodeFunctionData('entry_one', '0x000000008a521397')).toEqual(
      undefined
    );
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
    expect(() =>
      functionInterface.decodeFunctionData('entry_one', '0x1111111111111111000000000000002a')
    ).toThrow('data signature does not match function entry_one');
  });
});
