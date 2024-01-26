import { B512Type } from './B512Type';
import { BoolType } from './BoolType';

/**
 * @group node
 */
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

    const suitableForB512 = B512Type.isSuitableFor({ type: B512Type.swayType });
    const suitableForBool = B512Type.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForB512).toEqual(true);
    expect(suitableForBool).toEqual(false);

    expect(b512.attributes.inputLabel).toEqual('string');
    expect(b512.attributes.outputLabel).toEqual('string');
    expect(b512.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
