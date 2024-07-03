import { BoolType } from './BoolType';
import { StdStringType } from './StdStringType';
import { StrSliceType } from './StrSliceType';
import { StrType } from './StrType';

/**
 * @group node
 */
describe('StrSlicesType.ts', () => {
  test('should properly parse type attributes', () => {
    const strSlices = new StrSliceType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: StrSliceType.swayType,
      },
    });

    strSlices.parseComponentsAttributes({ types: [] });

    const suitableForStrSlices = StrSliceType.isSuitableFor({ type: StrSliceType.swayType });
    const suitableForU16 = StrSliceType.isSuitableFor({ type: BoolType.swayType });
    const suitableForStr = StrSliceType.isSuitableFor({ type: StrType.swayType });
    const suitableForStdString = StrSliceType.isSuitableFor({ type: StdStringType.swayType });

    expect(suitableForStrSlices).toEqual(true);
    expect(suitableForU16).toEqual(false);
    expect(suitableForStr).toEqual(false);
    expect(suitableForStdString).toEqual(false);

    expect(strSlices.attributes.inputLabel).toEqual('StrSlice');
    expect(strSlices.attributes.outputLabel).toEqual('StrSlice');
    expect(strSlices.requiredFuelsMembersImports).toStrictEqual(['StrSlice']);
  });
});
