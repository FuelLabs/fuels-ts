import { expect } from 'chai';

import { generateInputType, generateOutputType } from './types';

describe('Type codegen', () => {
  it('generates inputs from svmTypes', () => {
    expect(generateInputType({ type: 'bool', originalType: 'bool' })).to.eql('boolean');
    expect(generateInputType({ type: 'u8', bits: 8, originalType: 'u8' })).to.eql('BigNumberish');
    expect(generateInputType({ type: 'u16', bits: 16, originalType: 'u16' })).to.eql(
      'BigNumberish'
    );
    expect(generateInputType({ type: 'u32', bits: 32, originalType: 'u32' })).to.eql(
      'BigNumberish'
    );
    expect(generateInputType({ type: 'u64', bits: 64, originalType: 'u64' })).to.eql(
      'BigNumberish'
    );
    expect(generateInputType({ type: 'byte', size: 1, originalType: 'byte' })).to.eql('BytesLike');
    expect(generateInputType({ type: 'b256', originalType: 'b256' })).to.eql('string');
    expect(generateInputType({ type: 'address', originalType: 'address' })).to.eql('string');
    expect(generateInputType({ type: 'string', size: 10, originalType: 'string' })).to.eql(
      'string'
    );
    expect(
      generateInputType({
        type: 'array',
        size: 3,
        originalType: 'foobar',
        itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      })
    ).to.eq('[BigNumberish, BigNumberish, BigNumberish]');
    expect(
      generateInputType({
        type: 'tuple',
        originalType: 'barfoo',
        components: [{ type: {  type: 'u8', bits: 8, originalType: 'u8'}, name: 'count' }, { type: {  type: 'address', originalType: 'address'}, name: 'address' }]
      })
    ).to.eq('{count: BigNumberish,address: string}');
  });
  it('generates outputs from svmTypes', () => {
    expect(generateOutputType({ type: 'bool', originalType: 'bool' })).to.eql('boolean');
    expect(generateOutputType({ type: 'u8', bits: 8, originalType: 'u8' })).to.eql('number');
    expect(generateOutputType({ type: 'u16', bits: 16, originalType: 'u16' })).to.eql(
      'number'
    );
    expect(generateOutputType({ type: 'u32', bits: 32, originalType: 'u32' })).to.eql(
      'BigNumber'
    );
    expect(generateOutputType({ type: 'u64', bits: 64, originalType: 'u64' })).to.eql(
      'BigNumber'
    );
    expect(generateOutputType({ type: 'byte', size: 1, originalType: 'byte' })).to.eql('BytesLike');
    expect(generateOutputType({ type: 'b256', originalType: 'b256' })).to.eql('string');
    expect(generateOutputType({ type: 'address', originalType: 'address' })).to.eql('string');
    expect(generateOutputType({ type: 'string', size: 10, originalType: 'string' })).to.eql(
      'string'
    );
    expect(
      generateOutputType({
        type: 'array',
        size: 3,
        originalType: 'foobar',
        itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      })
    ).to.eq('[number, number, number]');
    expect(
      generateInputType({
        type: 'tuple',
        originalType: 'barfoo',
        components: [{ type: {  type: 'u8', bits: 8, originalType: 'u8'}, name: 'count' }, { type: {  type: 'address', originalType: 'address'}, name: 'address' }]
      })
    ).to.eq('{count: BigNumberish,address: string}');
  });
});
