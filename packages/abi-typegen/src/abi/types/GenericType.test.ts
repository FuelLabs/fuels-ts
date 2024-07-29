import { makeTestType } from '../../../test/utils/makeTestType';

import { GenericType } from './GenericType';
import { StructType } from './StructType';

/**
 * @group node
 */
describe('GenericType.ts', () => {
  test('should properly parse type attributes', () => {
    const generic = makeTestType(GenericType.swayType);

    const suitableForGeneric = GenericType.isSuitableFor({ type: GenericType.swayType });
    const suitableForEnum = GenericType.isSuitableFor({ type: StructType.swayType });

    expect(suitableForGeneric).toEqual(true);
    expect(suitableForEnum).toEqual(false);

    expect(generic.attributes.inputLabel).toEqual('T');
    expect(generic.attributes.outputLabel).toEqual('T');
    expect(generic.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
