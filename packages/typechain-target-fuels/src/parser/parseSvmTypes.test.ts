import { expect } from 'chai';

import { parseSvmType } from './parseSvmTypes';

describe('parseSvmTypes', () => {
  it('it maps a raw type to type', () => {
    expect(parseSvmType('str[10]')).to.eql({ type: 'string', size: 10, originalType: 'str[10]' });
    expect(parseSvmType('u8[2]')).to.eql({
      type: 'array',
      itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      size: 2,
      originalType: 'u8[2]',
    });
    expect(
      parseSvmType('tuple', [{ name: 'sender', type: { type: 'u8', bits: 8, originalType: 'u8' } }])
    ).to.eql({
      type: 'tuple',
      originalType: 'tuple',
      components: [{ name: 'sender', type: { type: 'u8', bits: 8, originalType: 'u8' } }],
    });
  });
});
