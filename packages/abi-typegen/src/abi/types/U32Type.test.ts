import { U32Type } from './U32Type';
import { U64Type } from './U64Type';

/**
 * @group node
 */
describe('U32Type.ts', () => {
  test('should properly parse type attributes', () => {
    const u32 = new U32Type({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: U32Type.swayType,
      },
    });

    u32.parseComponentsAttributes({ types: [] });

    const suitableForU32 = U32Type.isSuitableFor({ type: U32Type.swayType });
    const suitableForU64 = U32Type.isSuitableFor({ type: U64Type.swayType });

    expect(suitableForU32).toEqual(true);
    expect(suitableForU64).toEqual(false);

    expect(u32.attributes.inputLabel).toEqual('BigNumberish');
    expect(u32.attributes.outputLabel).toEqual('number');
    expect(u32.requiredFuelsMembersImports).toStrictEqual(['BigNumberish']);
  });
});
