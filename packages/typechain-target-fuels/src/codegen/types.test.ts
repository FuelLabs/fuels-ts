import { generateInputType, generateOutputType } from './types';

describe('Type codegen', () => {
  it('generates inputs from svmTypes', () => {
    expect(generateInputType({ type: 'bool', originalType: 'bool' })).toEqual('boolean');
    expect(generateInputType({ type: 'u8', bits: 8, originalType: 'u8' })).toEqual('BigNumberish');
    expect(generateInputType({ type: 'u16', bits: 16, originalType: 'u16' })).toEqual(
      'BigNumberish'
    );
    expect(generateInputType({ type: 'u32', bits: 32, originalType: 'u32' })).toEqual(
      'BigNumberish'
    );
    expect(generateInputType({ type: 'u64', bits: 64, originalType: 'u64' })).toEqual(
      'BigNumberish'
    );
    expect(generateInputType({ type: 'byte', size: 1, originalType: 'byte' })).toEqual('BytesLike');
    expect(generateInputType({ type: 'b256', originalType: 'b256' })).toEqual('string');
    expect(generateInputType({ type: 'address', originalType: 'address' })).toEqual('string');
    expect(generateInputType({ type: 'string', size: 10, originalType: 'string' })).toEqual(
      'string'
    );
    expect(
      generateInputType({
        type: 'array',
        size: 3,
        originalType: 'foobar',
        itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      })
    ).toEqual('[BigNumberish, BigNumberish, BigNumberish]');

    expect(
      generateInputType({
        type: 'enum',
        components: [
          { name: 'foo', type: { type: 'b256', originalType: 'b256' } },
          { name: 'bar', type: { type: 'b256', originalType: 'b256' } },
        ],
        originalType: 'enum MyCustomEnum',
        structName: 'MyCustomEnum',
      })
    ).toEqual('Enum<{foo: string, bar: string}>');

    expect(
      generateInputType({
        type: 'struct',
        components: [
          { name: 'foo', type: { type: 'b256', originalType: 'b256' } },
          { name: 'bar', type: { type: 'b256', originalType: 'b256' } },
        ],
        originalType: 'struct MyCustomStruct',
        structName: 'MyCustomStruct',
      })
    ).toEqual('{foo: string, bar: string}');

    expect(
      generateInputType({
        type: 'tuple',
        originalType: 'barfoo',
        structName: 'barfoo',
        components: [
          { type: { type: 'u8', bits: 8, originalType: 'u8' }, name: '__tuple_element' },
          { type: { type: 'address', originalType: 'address' }, name: '__tuple_element' },
        ],
      })
    ).toEqual('[BigNumberish, string]');
    expect(
      generateInputType({
        type: 'tuple',
        originalType: 'barfoo',
        structName: 'barfoo',
        components: [
          { type: { type: 'u8', bits: 8, originalType: 'u8' }, name: '__tuple_element' },
          { type: { type: 'address', originalType: 'address' }, name: '__tuple_element' },
        ],
      })
    ).toEqual('[BigNumberish, string]');
    expect(
      generateInputType({
        type: 'tuple',
        components: [
          {
            name: '__tuple_element',
            type: {
              type: 'enum',
              components: [
                { name: 'foo', type: { type: 'b256', originalType: 'b256' } },
                { name: 'bar', type: { type: 'b256', originalType: 'b256' } },
              ],
              originalType: 'enum MyCustom',
              structName: 'MyCustom',
            },
          },
        ],
        originalType: 'enum Tuple',
        structName: 'Return3',
      })
    ).toEqual('[MyCustomInput]');
  });
  it('generates outputs from svmTypes', () => {
    expect(generateOutputType({ type: 'bool', originalType: 'bool' })).toEqual('boolean');
    expect(generateOutputType({ type: 'u8', bits: 8, originalType: 'u8' })).toEqual('number');
    expect(generateOutputType({ type: 'u16', bits: 16, originalType: 'u16' })).toEqual('number');
    expect(generateOutputType({ type: 'u32', bits: 32, originalType: 'u32' })).toEqual('number');
    expect(generateOutputType({ type: 'u64', bits: 64, originalType: 'u64' })).toEqual('string');
    expect(generateOutputType({ type: 'byte', size: 1, originalType: 'byte' })).toEqual(
      'BytesLike'
    );
    expect(generateOutputType({ type: 'b256', originalType: 'b256' })).toEqual('string');
    expect(generateOutputType({ type: 'address', originalType: 'address' })).toEqual('string');
    expect(generateOutputType({ type: 'string', size: 10, originalType: 'string' })).toEqual(
      'string'
    );
    expect(
      generateOutputType({
        type: 'array',
        size: 3,
        originalType: 'foobar',
        itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      })
    ).toEqual('[number, number, number]');
    expect(
      generateOutputType({
        type: 'tuple',
        components: [
          { name: '__tuple_element', type: { type: 'b256', originalType: 'b256' } },
          { name: '__tuple_element', type: { type: 'b256', originalType: 'b256' } },
          {
            name: '__tuple_element',
            type: {
              type: 'tuple',
              components: [
                { name: '__tuple_element', type: { type: 'b256', originalType: 'b256' } },
                { name: '__tuple_element', type: { type: 'b256', originalType: 'b256' } },
              ],
              originalType: 'tuple',
              structName: '__tuple_element',
            },
          },
        ],
        originalType: 'tuple',
        structName: 'Return',
      })
    ).toEqual('[string, string, [string, string]]');
    expect(
      generateOutputType({
        type: 'tuple',
        originalType: 'barfoo',
        structName: 'barfoo',
        components: [
          { type: { type: 'u32', bits: 32, originalType: 'u32' }, name: '__tuple_element' },
          { type: { type: 'address', originalType: 'address' }, name: '__tuple_element' },
        ],
      })
    ).toEqual('[number, string]');
    expect(
      generateOutputType({
        type: 'tuple',
        components: [
          {
            name: 'custom',
            type: {
              type: 'enum',
              components: [
                { name: 'foo', type: { type: 'b256', originalType: 'b256' } },
                { name: 'bar', type: { type: 'b256', originalType: 'b256' } },
              ],
              originalType: 'enum MyCustom',
              structName: 'MyCustom',
            },
          },
        ],
        originalType: 'enum Tuple',
        structName: 'Return3',
      })
    ).toEqual('[MyCustomOutput]');
  });
});
