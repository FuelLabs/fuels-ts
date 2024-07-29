import { makeTestType } from '../../../test/utils/makeTestType';

import { U16Type } from './U16Type';
import { U8Type } from './U8Type';

/**
 * @group node
 */
describe('U8Type.ts', () => {
  test('should properly parse type attributes', () => {
    const u8 = makeTestType(U8Type.swayType);

    const suitableForU8 = U8Type.isSuitableFor({ type: U8Type.swayType });
    const suitableForU16 = U8Type.isSuitableFor({ type: U16Type.swayType });

    expect(suitableForU8).toEqual(true);
    expect(suitableForU16).toEqual(false);

    expect(u8.attributes.inputLabel).toEqual('BigNumberish');
    expect(u8.attributes.outputLabel).toEqual('number');
    expect(u8.requiredFuelsMembersImports).toStrictEqual(['BigNumberish']);
  });
});
