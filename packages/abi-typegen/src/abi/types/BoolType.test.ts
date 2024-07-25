import { BoolType } from './BoolType';
import { U16Type } from './U16Type';

/**
 * @group node
 */
describe('BoolType.ts', () => {
  test('should properly parse type attributes', () => {
    const bool = new BoolType({
      components: undefined,
      typeParamsArgsMap: undefined,
      metadataTypeId: undefined,
      type: BoolType.swayType,
    });

    const suitableForBool = BoolType.isSuitableFor({ type: BoolType.swayType });
    const suitableForU16 = BoolType.isSuitableFor({ type: U16Type.swayType });

    expect(suitableForBool).toEqual(true);
    expect(suitableForU16).toEqual(false);

    expect(bool.attributes.inputLabel).toEqual('boolean');
    expect(bool.attributes.outputLabel).toEqual('boolean');
    expect(bool.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
