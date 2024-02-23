import { U128Type } from './U128Type';
import { U64Type } from './U64Type';

/**
 * @group node
 */
describe('U128Type.ts', () => {
  test('should properly parse type attributes', () => {
    const u128 = new U128Type({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: U128Type.swayType,
      },
    });

    u128.parseComponentsAttributes({ types: [] });

    const suitableForU64 = U128Type.isSuitableFor({ type: U64Type.swayType });
    const suitableForU256 = U128Type.isSuitableFor({ type: U128Type.swayType });

    expect(suitableForU64).toEqual(false);
    expect(suitableForU256).toEqual(true);

    expect(u128.attributes.inputLabel).toEqual('BigNumberish');
    expect(u128.attributes.outputLabel).toEqual('BN');
    expect(u128.requiredFuelsMembersImports).toStrictEqual(['BigNumberish', 'BN']);
  });
});
