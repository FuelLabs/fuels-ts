import { B256Type } from './B256Type';
import { BoolType } from './BoolType';

/**
 * @group node
 */
describe('B256Type.ts', () => {
  test('should properly parse type attributes', () => {
    const b256 = new B256Type({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: B256Type.swayType,
      },
    });

    b256.parseComponentsAttributes({ types: [] });

    const suitableForB26 = B256Type.isSuitableFor({ type: B256Type.swayType });
    const suitableForBool = B256Type.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForB26).toEqual(true);
    expect(suitableForBool).toEqual(false);

    expect(b256.attributes.inputLabel).toEqual('string');
    expect(b256.attributes.outputLabel).toEqual('string');
    expect(b256.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
