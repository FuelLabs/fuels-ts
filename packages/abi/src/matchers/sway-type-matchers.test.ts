import { createMatcher, swayTypeMatchers } from './sway-type-matchers';

const matcher = createMatcher<`${string}-matched`>({
  string: 'string-matched',
  empty: 'empty-matched',
  bool: 'bool-matched',
  u8: 'u8-matched',
  u16: 'u16-matched',
  u32: 'u32-matched',
  u64: 'u64-matched',
  u256: 'u256-matched',
  b256: 'b256-matched',
  generic: 'generic-matched',
  stdString: 'stdString-matched',
  option: 'option-matched',
  result: 'result-matched',
  enum: 'enum-matched',
  struct: 'struct-matched',
  b512: 'b512-matched',
  bytes: 'bytes-matched',
  vector: 'vector-matched',
  tuple: 'tuple-matched',
  array: 'array-matched',
  assetId: 'assetId-matched',
  evmAddress: 'evmAddress-matched',
  rawUntypedPtr: 'rawUntypedPtr-matched',
  rawUntypedSlice: 'rawUntypedSlice-matched',
});

function verifyOtherMatchersDontMatch(type: keyof typeof swayTypeMatchers) {
  Object.entries(swayTypeMatchers)
    .filter(([key]) => key !== type)
    .forEach(([key]) => {
      expect(matcher({ swayType: key })).throws(`Matcher not found for ${key}`);
    });
}

/**
 * @group node
 * @group browser
 */
describe('sway type matchers', () => {
  test('empty', () => {
    const key = 'empty';
    const swayType = '()';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('bool', () => {
    const key = 'bool';
    const swayType = 'bool';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('u8', () => {
    const key = 'u8';
    const swayType = 'u8';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('u16', () => {
    const key = 'u16';
    const swayType = 'u16';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('u32', () => {
    const key = 'u32';
    const swayType = 'u32';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('u64', () => {
    const key = 'u64';
    const swayType = 'u64';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('u256', () => {
    const key = 'u256';
    const swayType = 'u256';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('b256', () => {
    const key = 'b256';
    const swayType = 'b256';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('string', () => {
    const key = 'string';
    const swayType = 'str[5]';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('array', () => {
    const key = 'array';
    const swayType = '[_; 3]';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('tuple', () => {
    const key = 'tuple';
    const swayType = '(_, _, _)';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('struct', () => {
    const key = 'struct';
    const swayType = 'struct MyStruct';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('assetId', () => {
    const key = 'assetId';
    const swayType = 'struct std::asset_id::AssetId';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('b512', () => {
    const key = 'b512';
    const swayType = 'struct std::b512::B512';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('assetId', () => {
    const key = 'assetId';
    const swayType = 'struct std::asset_id::AssetId';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('bytes', () => {
    const key = 'bytes';
    const swayType = 'struct std::bytes::Bytes';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('stdString', () => {
    const key = 'stdString';
    const swayType = 'struct std::string::String';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('evmAddress', () => {
    const key = 'evmAddress';
    const swayType = 'struct std::vm::evm::evm_address::EvmAddress';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('vector', () => {
    const key = 'vector';
    const swayType = 'struct std::vec::Vec';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('enum', () => {
    const key = 'enum';
    const swayType = 'enum MyEnum';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('option', () => {
    const key = 'option';
    const swayType = 'enum std::option::Option';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('result', () => {
    const key = 'result';
    const swayType = 'enum std::result::Result';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('rawUntypedPtr', () => {
    const key = 'rawUntypedPtr';
    const swayType = 'raw untyped ptr';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('rawUntypedSlice', () => {
    const key = 'rawUntypedSlice';
    const swayType = 'raw untyped slice';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('generic', () => {
    const key = 'generic';
    const swayType = 'generic T';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key);
  });

  test('raw vector is not interpreted as vector', () => {
    expect(swayTypeMatchers.vector('struct std::vec::RawVec')).toEqual(false);
  });
});
