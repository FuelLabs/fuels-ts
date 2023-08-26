import { U32Type } from './U32Type';
import { U64Type } from './U64Type';

/**
 * @group node
 */
describe('U64Type.ts', () => {
  test('should properly parse type attributes', () => {
    const u64 = new U64Type({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: U64Type.swayType,
      },
    });

    u64.parseComponentsAttributes({ types: [] });

    const suitableForU32 = U64Type.isSuitableFor({ type: U32Type.swayType });
    const suitableForU64 = U64Type.isSuitableFor({ type: U64Type.swayType });

    expect(suitableForU32).toEqual(false);
    expect(suitableForU64).toEqual(true);

    expect(u64.attributes.inputLabel).toEqual('BigNumberish');
    expect(u64.attributes.outputLabel).toEqual('BN');
    expect(u64.requiredFuelsMembersImports).toStrictEqual(['BigNumberish', 'BN']);
  });
});
