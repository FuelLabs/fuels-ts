import { makeTestType } from '../../../test/utils/makeTestType';

import { AssetIdType } from './AssetIdType';
import { BoolType } from './BoolType';

/**
 * @group node
 */
describe('AssetIdType.ts', () => {
  /**
   * TODO: unskip test
   * Skipped because `AssetIdType` was never part of `supportedTypes`
   * and thus was never used.
   * From a functionality standpoint, it and this test can be deleted,
   * but I'm leaving it here for when we support `AssetId` as a string
   * in the coders and not treat it as a \{ bits: string \} struct
   */

  test.skip('should properly parse type attributes', () => {
    const assetId = makeTestType(AssetIdType.swayType);

    const suitableForAssetId = AssetIdType.isSuitableFor({ type: AssetIdType.swayType });
    const suitableForBool = AssetIdType.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForAssetId).toEqual(true);
    expect(suitableForBool).toEqual(false);

    expect(assetId.attributes.inputLabel).toEqual('string');
    expect(assetId.attributes.outputLabel).toEqual('string');
    expect(assetId.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
