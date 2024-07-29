import { makeTestType } from '../../../test/utils/makeTestType';

import { StructType } from './StructType';
import { VectorType } from './VectorType';

/**
 * @group node
 */
describe('VectorType.ts', () => {
  test('should properly parse type attributes', () => {
    const vector = makeTestType(VectorType.swayType);

    const suitableForVector = VectorType.isSuitableFor({ type: VectorType.swayType });
    const suitableForRawVector = VectorType.isSuitableFor({ type: 'struct RawVec' });
    const suitableForStruct = VectorType.isSuitableFor({ type: StructType.swayType });

    expect(suitableForVector).toEqual(true);
    expect(suitableForRawVector).toEqual(false);
    expect(suitableForStruct).toEqual(false);

    expect(vector.attributes.inputLabel).toEqual('Vec');
    expect(vector.attributes.outputLabel).toEqual('Vec');
    expect(vector.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
