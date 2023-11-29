import { BoolType } from './BoolType';
import { StrSlicesType } from './StrSlicesType';

describe('StrType.ts', () => {
  test('should properly parse type attributes', () => {
    const strSlices = new StrSlicesType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: StrSlicesType.swayType,
      },
    });

    strSlices.parseComponentsAttributes({ types: [] });

    const suitableForStrSlices = StrSlicesType.isSuitableFor({ type: StrSlicesType.swayType });
    const suitableForU16 = StrSlicesType.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForStrSlices).toEqual(true);
    expect(suitableForU16).toEqual(false);

    expect(strSlices.attributes.inputLabel).toEqual('string');
    expect(strSlices.attributes.outputLabel).toEqual('string');
    expect(strSlices.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
