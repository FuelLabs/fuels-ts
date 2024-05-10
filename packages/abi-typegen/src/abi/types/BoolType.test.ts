import { BoolType } from './BoolType';
import { U16Type } from './U16Type';

/**
 * @group node
 */
describe('BoolType.ts', () => {
  test('should properly parse type attributes', () => {
    const bool = new BoolType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: BoolType.swayType,
      },
    });

    bool.parseComponentsAttributes({ types: [] });

    const suitableForBool = BoolType.isSuitableFor({ type: BoolType.swayType });
    const suitableForU16 = BoolType.isSuitableFor({ type: U16Type.swayType });

    expect(suitableForBool).toEqual(true);
    expect(suitableForU16).toEqual(false);

    expect(bool.attributes.inputLabel).toEqual('boolean');
    expect(bool.attributes.outputLabel).toEqual('boolean');
    expect(bool.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
