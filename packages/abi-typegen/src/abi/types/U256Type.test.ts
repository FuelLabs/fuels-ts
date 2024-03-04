import { U256Type } from './U256Type';
import { U64Type } from './U64Type';

/**
 * @group node
 */
describe('U256Type.ts', () => {
  test('should properly parse type attributes', () => {
    const u256 = new U256Type({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: U256Type.swayType,
      },
    });

    u256.parseComponentsAttributes({ types: [] });

    const suitableForU64 = U256Type.isSuitableFor({ type: U64Type.swayType });
    const suitableForU256 = U256Type.isSuitableFor({ type: U256Type.swayType });

    expect(suitableForU64).toEqual(false);
    expect(suitableForU256).toEqual(true);

    expect(u256.attributes.inputLabel).toEqual('BigNumberish');
    expect(u256.attributes.outputLabel).toEqual('BN');
    expect(u256.requiredFuelsMembersImports).toStrictEqual(['BigNumberish', 'BN']);
  });
});
