import { makeTestType } from '../../../test/utils/makeTestType';

import { BytesType } from './BytesType';
import { StructType } from './StructType';

/**
 * @group node
 */
describe('BytesType.ts', () => {
  test('should properly parse type attributes', () => {
    const bytes = makeTestType(BytesType.swayType);

    const suitableForBytes = BytesType.isSuitableFor({ type: BytesType.swayType });
    const suitableForStruct = BytesType.isSuitableFor({ type: StructType.swayType });

    expect(suitableForBytes).toEqual(true);
    expect(suitableForStruct).toEqual(false);

    expect(bytes.attributes.inputLabel).toEqual('Bytes');
    expect(bytes.attributes.outputLabel).toEqual('Bytes');
    expect(bytes.requiredFuelsMembersImports).toStrictEqual(['Bytes']);
  });
});
