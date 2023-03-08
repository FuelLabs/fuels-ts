import { B512Type } from './B512Type';
import { BoolType } from './BoolType';

describe('B512Type.ts', () => {
  test('should properly parse type attributes', () => {
    const b512 = new B512Type({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: B512Type.swayType,
      },
    });

    b512.parseComponentsAttributes({ types: [] });

    const suitableForB26 = B512Type.isSuitableFor({ type: B512Type.swayType });
    const suitableForBool = B512Type.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForB26).toEqual(true);
    expect(suitableForBool).toEqual(false);

    expect(b512.attributes.inputLabel).toEqual('string');
    expect(b512.attributes.outputLabel).toEqual('string');
    expect(b512.requireImportFromFuels).toEqual(false);
  });
});
