import { GenericType } from './GenericType';
import { StructType } from './StructType';

describe('GenericType.ts', () => {
  test('should properly parse type attributes', () => {
    const generic = new GenericType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: GenericType.swayTypeExample,
      },
    });

    generic.parseComponentsAttributes({ types: [] });

    const suitableForGeneric = GenericType.isSuitableFor({ type: GenericType.swayTypeExample });
    const suitableForEnum = GenericType.isSuitableFor({ type: StructType.swayTypeExample });

    expect(suitableForGeneric).toEqual(true);
    expect(suitableForEnum).toEqual(false);

    expect(generic.attributes.inputLabel).toEqual('T');
    expect(generic.attributes.outputLabel).toEqual('T');
  });
});
