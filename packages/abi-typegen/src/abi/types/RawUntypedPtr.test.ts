import { makeTestType } from '../../../test/utils/makeTestType';

import { RawUntypedPtr } from './RawUntypedPtr';
import { U8Type } from './U8Type';

/**
 * @group node
 */
describe('RawUntypedPtrType.ts', () => {
  test('should properly parse type attributes', () => {
    const rawUntypedPtr = makeTestType(RawUntypedPtr.swayType);

    const suitableForU8 = RawUntypedPtr.isSuitableFor({ type: U8Type.swayType });
    const suitableForRawUntypedPtr = RawUntypedPtr.isSuitableFor({
      type: RawUntypedPtr.swayType,
    });

    expect(suitableForU8).toEqual(false);
    expect(suitableForRawUntypedPtr).toEqual(true);

    expect(rawUntypedPtr.attributes.inputLabel).toEqual('BigNumberish');
    expect(rawUntypedPtr.attributes.outputLabel).toEqual('BN');
    expect(rawUntypedPtr.requiredFuelsMembersImports).toStrictEqual(['BigNumberish', 'BN']);
  });
});
