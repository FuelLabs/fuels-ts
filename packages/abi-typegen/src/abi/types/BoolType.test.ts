import { BoolType } from './BoolType';
import { U16Type } from './U16Type';

describe('BoolType.ts', () => {
  test('should properly parse type attributes', () => {
    const bool = new BoolType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: BoolType.swayTypeExample,
      },
    });

    bool.parseComponentsAttributes({ types: [] });

    const suitableForBool = BoolType.isSuitableFor({ type: BoolType.swayTypeExample });
    const suitableForU16 = BoolType.isSuitableFor({ type: U16Type.swayTypeExample });

    expect(suitableForBool).toEqual(true);
    expect(suitableForU16).toEqual(false);

    expect(bool.attributes.inputLabel).toEqual('boolean');
    expect(bool.attributes.outputLabel).toEqual('boolean');
  });
});
