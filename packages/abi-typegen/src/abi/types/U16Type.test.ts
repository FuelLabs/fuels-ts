import { makeTestType } from '../../../test/utils/makeTestType';

import { U16Type } from './U16Type';
import { U32Type } from './U32Type';

/**
 * @group node
 */
describe('U16Type.ts', () => {
  test('should properly parse type attributes', () => {
    const u16 = makeTestType(U16Type.swayType);

    const suitableForU16 = U16Type.isSuitableFor({ type: U16Type.swayType });
    const suitableForU32 = U16Type.isSuitableFor({ type: U32Type.swayType });

    expect(suitableForU16).toEqual(true);
    expect(suitableForU32).toEqual(false);

    expect(u16.attributes.inputLabel).toEqual('BigNumberish');
    expect(u16.attributes.outputLabel).toEqual('number');
    expect(u16.requiredFuelsMembersImports).toStrictEqual(['BigNumberish']);
  });
});
