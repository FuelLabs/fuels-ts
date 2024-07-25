import { RawUntypedSlice } from './RawUntypedSlice';
import { StructType } from './StructType';

/**
 * @group node
 */
describe('RawUntypedSlice.ts', () => {
  test('should properly parse type attributes', () => {
    const rawSlice = new RawUntypedSlice({
      components: undefined,
      typeParamsArgsMap: undefined,
      metadataTypeId: 1,
      type: RawUntypedSlice.swayType,
    });

    const suitableForRawUntyped = RawUntypedSlice.isSuitableFor({ type: RawUntypedSlice.swayType });
    const suitableForStruct = RawUntypedSlice.isSuitableFor({ type: StructType.swayType });

    expect(suitableForRawUntyped).toEqual(true);
    expect(suitableForStruct).toEqual(false);

    expect(rawSlice.attributes.inputLabel).toEqual('RawSlice');
    expect(rawSlice.attributes.outputLabel).toEqual('RawSlice');
    expect(rawSlice.requiredFuelsMembersImports).toStrictEqual(['RawSlice']);
  });
});
