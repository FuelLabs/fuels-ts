import { AssetIdType } from './AssetIdType';
import { BoolType } from './BoolType';

/**
 * @group node
 */
describe('AssetIdType.ts', () => {
  test('should properly parse type attributes', () => {
    const b512 = new AssetIdType({
      components: undefined,
      typeParamsArgsMap: undefined,
      metadataTypeId: 1,
      type: AssetIdType.swayType,
    });

    const suitableForAssetId = AssetIdType.isSuitableFor({ type: AssetIdType.swayType });
    const suitableForBool = AssetIdType.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForAssetId).toEqual(true);
    expect(suitableForBool).toEqual(false);

    expect(b512.attributes.inputLabel).toEqual('string');
    expect(b512.attributes.outputLabel).toEqual('string');
    expect(b512.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
