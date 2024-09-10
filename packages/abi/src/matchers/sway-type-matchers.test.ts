import { swayTypeMatchers } from './sway-type-matchers';

const testCases: Record<keyof typeof swayTypeMatchers, string> = {
  empty: '()',
  generic: 'generic T',
  bool: 'bool',
  u8: 'u8',
  u16: 'u16',
  u32: 'u32',
  u64: 'u64',
  u256: 'u256',
  b256: 'b256',

  string: 'str[5]',
  array: '[_; 2]',
  tuple: '(_, _, _)',

  struct: 'struct MyStruct',
  assetId: 'struct std::asset_id::AssetId',
  b512: 'struct std::b512::B512',
  bytes: 'struct std::bytes::Bytes',
  evmAddress: 'struct std::vm::evm::evm_address::EvmAddress',
  stdString: 'struct std::string::String',
  vector: 'struct std::vec::Vec',

  enum: 'enum MyEnum',
  option: 'enum std::option::Option',
  result: 'enum std::result::Result',

  rawUntypedPtr: 'raw untyped ptr',
  rawUntypedSlice: 'raw untyped slice',
};

describe('sway type matchers', () => {
  test.each(Object.entries(testCases))('%s - %s', (type, value) => {
    expect(swayTypeMatchers[type as keyof typeof swayTypeMatchers](value)).toEqual(true);

    // verify that it doesn't match any other type
    const allOtherMatchers = Object.entries(swayTypeMatchers).filter(([key]) => key !== type);
    allOtherMatchers.forEach(([, matcher]) => {
      expect(matcher(value)).toEqual(false);
    });
  });

  test('raw vector is not interpreted as vector', () => {
    expect(swayTypeMatchers.vector('struct std::vec::RawVec')).toEqual(false);
  });
});
