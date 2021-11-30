import { parseSvmType } from './parseSvmTypes';

describe('parseSvmTypes', () => {
  it('it maps a raw type to type', () => {
    expect(parseSvmType('str[10]')).toEqual({ type: 'string', size: 10, originalType: 'str[10]' });
    expect(parseSvmType('u8[2]')).toEqual({
      type: 'array',
      itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      size: 2,
      originalType: 'u8[2]',
    });
    expect(
      parseSvmType(
        'tuple',
        [{ name: 'sender', type: { type: 'u8', bits: 8, originalType: 'u8' } }],
        'foobar'
      )
    ).toEqual({
      type: 'tuple',
      originalType: 'tuple',
      structName: 'Foobar',
      components: [{ name: 'sender', type: { type: 'u8', bits: 8, originalType: 'u8' } }],
    });
  });
});
