import * as makeConfigurableMod from './makeConfigurable';
import { parseConfigurables } from './parseConfigurables';

/**
 * @group node
 */
describe('parseConfigurables.ts', () => {
  function mockAllDeps() {
    const rawAbiType = {
      typeId: 1,
      type: 'mockType',
      components: null,
      typeParameters: null,
    };

    const type = {
      name: 'mockType',
      attributes: {
        inputLabel: 'mockType',
        outputLabel: 'mockType',
      },
      rawAbiType,
      requiredFuelsMembersImports: [],
      parseComponentsAttributes: vi.fn(),
    };

    const rawAbiConfigurable = {
      name: 'mockConfigurable',
      configurableType: {
        name: 'mockConfigurable',
        type: 1,
        typeArguments: null,
      },
      offset: 0,
    };

    const configurable = {
      name: 'mockConfigurable',
      type,
      rawAbiConfigurable,
    };

    const makeConfigurable = vi
      .spyOn(makeConfigurableMod, 'makeConfigurable')
      .mockReturnValue(configurable);

    return {
      type,
      rawAbiConfigurable,
      makeConfigurable,
    };
  }

  it('should parse configurables ABI and return configurables instances', () => {
    const { type, rawAbiConfigurable, makeConfigurable } = mockAllDeps();
    const rawAbiConfigurables = [rawAbiConfigurable];
    const types = [type];

    const configurables = parseConfigurables({ rawAbiConfigurables, types });

    expect(makeConfigurable).toHaveBeenCalledTimes(1);

    const configurable = configurables[0];
    expect(configurable.name).toEqual(rawAbiConfigurable.name);
  });
});
