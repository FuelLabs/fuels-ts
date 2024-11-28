import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { SwayType, swayTypeMatchers } from './sway-type-matchers';
import { createMatcher } from './sway-type-matchers';

const testMappings: Record<keyof typeof swayTypeMatchers, `${string}-matched`> = {
  string: 'string-matched',
  void: 'void-matched',
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
  str: 'str-matched',
};

const matcher = createMatcher(testMappings);

async function verifyOtherMatchersDontMatch(key: keyof typeof testMappings, swayType: string) {
  const testMappingsWithoutKey = Object.fromEntries(
    Object.entries(testMappings).filter(([k]) => k !== key)
  );

  const verifier = createMatcher(testMappingsWithoutKey as Record<SwayType, string>);

  await expectToThrowFuelError(
    () => verifier({ swayType }),
    new FuelError(
      FuelError.CODES.MATCHER_NOT_FOUND,
      `Matcher not found for Sway type "${swayType}".`
    )
  );
}

/**
 * @group node
 * @group browser
 */
describe('sway type matchers', () => {
  test('void', async () => {
    const key = 'void';
    const swayType = '()';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('bool', async () => {
    const key = 'bool';
    const swayType = 'bool';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u8', async () => {
    const key = 'u8';
    const swayType = 'u8';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u16', async () => {
    const key = 'u16';
    const swayType = 'u16';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u32', async () => {
    const key = 'u32';
    const swayType = 'u32';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u64', async () => {
    const key = 'u64';
    const swayType = 'u64';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('u256', async () => {
    const key = 'u256';
    const swayType = 'u256';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('b256', async () => {
    const key = 'b256';
    const swayType = 'b256';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('string', async () => {
    const key = 'string';
    const swayType = 'str[5]';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('array', async () => {
    const key = 'array';
    const swayType = '[_; 3]';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('tuple', async () => {
    const key = 'tuple';
    const swayType = '(_, _, _)';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('struct', async () => {
    const key = 'struct';
    const swayType = 'struct MyStruct';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('assetId', async () => {
    const key = 'assetId';
    const swayType = 'struct std::asset_id::AssetId';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('b512', async () => {
    const key = 'b512';
    const swayType = 'struct std::b512::B512';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('assetId', async () => {
    const key = 'assetId';
    const swayType = 'struct std::asset_id::AssetId';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('bytes', async () => {
    const key = 'bytes';
    const swayType = 'struct std::bytes::Bytes';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('stdString', async () => {
    const key = 'stdString';
    const swayType = 'struct std::string::String';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('evmAddress', async () => {
    const key = 'evmAddress';
    const swayType = 'struct std::vm::evm::evm_address::EvmAddress';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('vector', async () => {
    const key = 'vector';
    const swayType = 'struct std::vec::Vec';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('enum', async () => {
    const key = 'enum';
    const swayType = 'enum MyEnum';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('option', async () => {
    const key = 'option';
    const swayType = 'enum std::option::Option';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('result', async () => {
    const key = 'result';
    const swayType = 'enum std::result::Result';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('rawUntypedPtr', async () => {
    const key = 'rawUntypedPtr';
    const swayType = 'raw untyped ptr';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('rawUntypedSlice', async () => {
    const key = 'rawUntypedSlice';
    const swayType = 'raw untyped slice';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('generic', async () => {
    const key = 'generic';
    const swayType = 'generic T';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('str', async () => {
    const key = 'str';
    const swayType = 'str';

    expect(matcher({ swayType })).toEqual(`${key}-matched`);
    await verifyOtherMatchersDontMatch(key, swayType);
  });

  test('matcher without mapping for valid sway type throws', async () => {
    const swayType = 'str';

    // @ts-expect-error intentionally missing key for valid swayType
    const matcherWithoutMappings = createMatcher({});

    await expectToThrowFuelError(
      () => matcherWithoutMappings({ swayType }),
      new FuelError(
        FuelError.CODES.MATCHER_NOT_FOUND,
        `Matcher not found for Sway type "${swayType}".`
      )
    );
  });
});
