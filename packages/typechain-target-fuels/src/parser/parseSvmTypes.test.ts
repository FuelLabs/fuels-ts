import { parseSvmType, normalizeName } from './parseSvmTypes';

describe('parseSvmTypes', () => {
  it('it maps a raw type to type', () => {
    expect(parseSvmType('str[10]')).toEqual({ type: 'string', size: 10, originalType: 'str[10]' });
    expect(parseSvmType('[u8; 2]')).toEqual({
      type: 'array',
      itemType: { type: 'u8', bits: 8, originalType: 'u8' },
      size: 2,
      originalType: '[u8; 2]',
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
    expect(
      parseSvmType('struct MyParams', [
        { name: 'foo', type: { type: 'u8', bits: 8, originalType: 'u8' } },
        { name: 'bar', type: { type: 'u8', bits: 8, originalType: 'u8' } },
      ])
    ).toEqual({
      type: 'tuple',
      originalType: 'struct MyParams',
      structName: 'MyParams',
      components: [
        { name: 'foo', type: { type: 'u8', bits: 8, originalType: 'u8' } },
        { name: 'bar', type: { type: 'u8', bits: 8, originalType: 'u8' } },
      ],
    });
    expect(
      parseSvmType('enum MyParams', [
        { name: 'foo', type: { type: 'u8', bits: 8, originalType: 'u8' } },
        { name: 'bar', type: { type: 'u8', bits: 8, originalType: 'u8' } },
      ])
    ).toEqual({
      type: 'tuple',
      originalType: 'enum MyParams',
      structName: 'MyParams',
      components: [
        { name: 'foo', type: { type: 'u8', bits: 8, originalType: 'u8' } },
        { name: 'bar', type: { type: 'u8', bits: 8, originalType: 'u8' } },
      ],
    });
  });
});

describe('normalizeName', () => {
  it('it should make nice names', () => {
    expect(normalizeName('DsToken')).toEqual('DsToken');
    expect(normalizeName('test')).toEqual('Test');
    expect(normalizeName('ds-token')).toEqual('DsToken');
    expect(normalizeName('ds_token')).toEqual('DsToken');
    expect(normalizeName('Aaa_bbb_CCDD-EEE')).toEqual('AaaBbbCCDDEEE');
    expect(normalizeName('ds token')).toEqual('DsToken');
    expect(normalizeName('name.abi')).toEqual('NameAbi');
    expect(normalizeName('1234name.abi')).toEqual('NameAbi');
    expect(normalizeName('ERC20.abi')).toEqual('ERC20Abi');
  });
});
