import type { SwayType, swayTypeMatchers } from './sway-type-matchers';
import { createMatcher } from './sway-type-matchers';

const testMappings: Record<keyof typeof swayTypeMatchers, `${string}-matched`> = {
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
};

const matcher = createMatcher(testMappings);

function verifyOtherMatchersDontMatch(key: keyof typeof testMappings, swayType: string) {
  const testMappingsWithoutKey = Object.fromEntries(
    Object.entries(testMappings).filter(([k]) => k !== key)
  );

  const verifier = createMatcher(testMappingsWithoutKey as Record<SwayType, string>);

  expect(() => verifier({ swayType })).toThrow(`Matcher not found for sway type ${swayType}.`);
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
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('bool', () => {
    const key = 'bool';
    const swayType = 'bool';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u8', () => {
    const key = 'u8';
    const swayType = 'u8';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u16', () => {
    const key = 'u16';
    const swayType = 'u16';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u32', () => {
    const key = 'u32';
    const swayType = 'u32';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u64', () => {
    const key = 'u64';
    const swayType = 'u64';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u256', () => {
    const key = 'u256';
    const swayType = 'u256';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('b256', () => {
    const key = 'b256';
    const swayType = 'b256';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('string', () => {
    const key = 'string';
    const swayType = 'str[5]';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('array', () => {
    const key = 'array';
    const swayType = '[_; 3]';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('tuple', () => {
    const key = 'tuple';
    const swayType = '(_, _, _)';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('struct', () => {
    const key = 'struct';
    const swayType = 'struct MyStruct';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('assetId', () => {
    const key = 'assetId';
    const swayType = 'struct std::asset_id::AssetId';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('b512', () => {
    const key = 'b512';
    const swayType = 'struct std::b512::B512';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('assetId', () => {
    const key = 'assetId';
    const swayType = 'struct std::asset_id::AssetId';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('bytes', () => {
    const key = 'bytes';
    const swayType = 'struct std::bytes::Bytes';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('stdString', () => {
    const key = 'stdString';
    const swayType = 'struct std::string::String';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('evmAddress', () => {
    const key = 'evmAddress';
    const swayType = 'struct std::vm::evm::evm_address::EvmAddress';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('vector', () => {
    const key = 'vector';
    const swayType = 'struct std::vec::Vec';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('enum', () => {
    const key = 'enum';
    const swayType = 'enum MyEnum';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('option', () => {
    const key = 'option';
    const swayType = 'enum std::option::Option';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('result', () => {
    const key = 'result';
    const swayType = 'enum std::result::Result';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('rawUntypedPtr', () => {
    const key = 'rawUntypedPtr';
    const swayType = 'raw untyped ptr';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('rawUntypedSlice', () => {
    const key = 'rawUntypedSlice';
    const swayType = 'raw untyped slice';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });

  test('generic', () => {
    const key = 'generic';
    const swayType = 'generic T';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    verifyOtherMatchersDontMatch(key, swayType);
  });
});
