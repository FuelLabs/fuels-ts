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
        type: 'tuple',
        originalType: 'barfoo',
        structName: 'barfoo',
        components: [
          { type: { type: 'u8', bits: 8, originalType: 'u8' }, name: 'count' },
          { type: { type: 'address', originalType: 'address' }, name: 'address' },
        ],
      })
    ).toEqual('{count: BigNumberish,address: string}');
  });
  it('generates outputs from svmTypes', () => {
    expect(generateOutputType({ type: 'bool', originalType: 'bool' })).toEqual('boolean');
    expect(generateOutputType({ type: 'u8', bits: 8, originalType: 'u8' })).toEqual('number');
    expect(generateOutputType({ type: 'u16', bits: 16, originalType: 'u16' })).toEqual('number');
    expect(generateOutputType({ type: 'u32', bits: 32, originalType: 'u32' })).toEqual('BigNumber');
    expect(generateOutputType({ type: 'u64', bits: 64, originalType: 'u64' })).toEqual('BigNumber');
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
      generateInputType({
        type: 'tuple',
        originalType: 'barfoo',
        structName: 'barfoo',
        components: [
          { type: { type: 'u8', bits: 8, originalType: 'u8' }, name: 'count' },
          { type: { type: 'address', originalType: 'address' }, name: 'address' },
        ],
      })
    ).toEqual('{count: BigNumberish,address: string}');
  });
});
