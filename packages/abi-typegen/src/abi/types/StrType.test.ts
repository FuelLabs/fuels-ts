import { BoolType } from './BoolType';
import { StrType } from './StrType';

/**
 * @group node
 */
describe('StrType.ts', () => {
  test('should properly parse type attributes', () => {
    const str = new StrType({
      components: undefined,
      typeParamsArgsMap: undefined,
      metadataTypeId: undefined,
      type: StrType.swayType,
    });

    const suitableForStr = StrType.isSuitableFor({ type: StrType.swayType });
    const suitableForU16 = StrType.isSuitableFor({ type: BoolType.swayType });

    expect(suitableForStr).toEqual(true);
    expect(suitableForU16).toEqual(false);

    expect(str.attributes.inputLabel).toEqual('string');
    expect(str.attributes.outputLabel).toEqual('string');
    expect(str.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
