import { Configurable } from '../abi/configurable/Configurable';

import { makeConfigurable } from './makeConfigurable';

/**
 * @group node
 */
describe('makeConfigurable.ts', () => {
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

    return {
      type,
      rawAbiConfigurable,
    };
  }

  it('should instantiate a configurable instance', () => {
    const { type, rawAbiConfigurable } = mockAllDeps();
    const types = [type];

    const configurable = makeConfigurable({ types, rawAbiConfigurable });

    expect(configurable).toBeInstanceOf(Configurable);
    expect(configurable.name).toEqual(rawAbiConfigurable.name);
    expect(configurable.type).toEqual(type);
    expect(configurable.rawAbiConfigurable).toEqual(rawAbiConfigurable);
  });
});
