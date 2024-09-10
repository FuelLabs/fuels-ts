import { swayTypeMatcherEntries, swayTypeMatchers } from './sway-type-matchers';

function verifyOtherMatchersDontMatch(type: keyof typeof swayTypeMatchers, value: string) {
  swayTypeMatcherEntries
    .filter(([key]) => key !== type)
    .forEach(([, matcher]) => {
      expect(matcher(value)).toEqual(false);
    });
}

/**
 * @group node
 * @group browser
 */
describe('sway type matchers', () => {
  test('empty', () => {
    const key = 'empty';
    const value = '()';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('bool', () => {
    const key = 'bool';
    const value = 'bool';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('u8', () => {
    const key = 'u8';
    const value = 'u8';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('u16', () => {
    const key = 'u16';
    const value = 'u16';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('u32', () => {
    const key = 'u32';
    const value = 'u32';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('u64', () => {
    const key = 'u64';
    const value = 'u64';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('u256', () => {
    const key = 'u256';
    const value = 'u256';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('b256', () => {
    const key = 'b256';
    const value = 'b256';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('string', () => {
    const key = 'string';
    const value = 'str[5]';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('array', () => {
    const key = 'array';
    const value = '[_; 3]';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('tuple', () => {
    const key = 'tuple';
    const value = '(_, _, _)';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('struct', () => {
    const key = 'struct';
    const value = 'struct MyStruct';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('assetId', () => {
    const key = 'assetId';
    const value = 'struct std::asset_id::AssetId';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('b512', () => {
    const key = 'b512';
    const value = 'struct std::b512::B512';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('assetId', () => {
    const key = 'assetId';
    const value = 'struct std::asset_id::AssetId';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('bytes', () => {
    const key = 'bytes';
    const value = 'struct std::bytes::Bytes';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('stdString', () => {
    const key = 'stdString';
    const value = 'struct std::string::String';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('evmAddress', () => {
    const key = 'evmAddress';
    const value = 'struct std::vm::evm::evm_address::EvmAddress';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('vector', () => {
    const key = 'vector';
    const value = 'struct std::vec::Vec';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('enum', () => {
    const key = 'enum';
    const value = 'enum MyEnum';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('option', () => {
    const key = 'option';
    const value = 'enum std::option::Option';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('result', () => {
    const key = 'result';
    const value = 'enum std::result::Result';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('rawUntypedPtr', () => {
    const key = 'rawUntypedPtr';
    const value = 'raw untyped ptr';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('rawUntypedSlice', () => {
    const key = 'rawUntypedSlice';
    const value = 'raw untyped slice';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('generic', () => {
    const key = 'generic';
    const value = 'generic T';

    expect(swayTypeMatchers[key](value)).toEqual(true);
    verifyOtherMatchersDontMatch(key, value);
  });

  test('raw vector is not interpreted as vector', () => {
    expect(swayTypeMatchers.vector('struct std::vec::RawVec')).toEqual(false);
  });
});
