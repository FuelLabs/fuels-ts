import { formatConfigurables } from './formatConfigurables';

/**
 * @group node
 */
describe('formatConfigurables.ts', () => {
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

    return {
      configurable,
    };
  }

  it('should format a configurable instance', () => {
    const { configurable } = mockAllDeps();
    const configurables = [configurable];

    const { formattedConfigurables } = formatConfigurables({ configurables });
    const formattedConfigurable = formattedConfigurables[0];

    expect(formattedConfigurable.configurableName).toEqual('mockConfigurable');
    expect(formattedConfigurable.configurableType).toEqual('mockType');
  });
});
