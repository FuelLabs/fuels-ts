import { RawUntypedSlice } from './RawUntypedSlice';
import { StructType } from './StructType';

/**
 * @group node
 */
describe('RawUntypedSlice.ts', () => {
  test('should properly parse type attributes', () => {
    const rawSlice = new RawUntypedSlice({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: RawUntypedSlice.swayType,
      },
    });

    rawSlice.parseComponentsAttributes({ types: [] });

    const suitableForRawUntyped = RawUntypedSlice.isSuitableFor({ type: RawUntypedSlice.swayType });
    const suitableForStruct = RawUntypedSlice.isSuitableFor({ type: StructType.swayType });

    expect(suitableForRawUntyped).toEqual(true);
    expect(suitableForStruct).toEqual(false);

    expect(rawSlice.attributes.inputLabel).toEqual('RawSlice');
    expect(rawSlice.attributes.outputLabel).toEqual('RawSlice');
    expect(rawSlice.requiredFuelsMembersImports).toStrictEqual(['RawSlice']);
  });
});
