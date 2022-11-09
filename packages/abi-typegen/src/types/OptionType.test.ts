import { EnumType } from './EnumType';
import { OptionType } from './OptionType';

describe('OptionType.ts', () => {
  test('should properly parse type attributes', () => {
    const option = new OptionType({
      rawAbiType: {
        components: null,
        typeParameters: null,
        typeId: 1,
        type: OptionType.swayTypeExample,
      },
    });

    option.parseComponentsAttributes({ types: [] });

    const suitableForOption = OptionType.isSuitableFor({ type: OptionType.swayTypeExample });
    const suitableForEnum = OptionType.isSuitableFor({ type: EnumType.swayTypeExample });

    expect(suitableForOption).toEqual(true);
    expect(suitableForEnum).toEqual(false);

    expect(option.attributes.inputLabel).toEqual('Option');
    expect(option.attributes.outputLabel).toEqual('Option');
  });
});
