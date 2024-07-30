import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import type { IType } from '../../types/interfaces/IType';
import type { JsonAbiType } from '../../types/interfaces/JsonAbi';
import * as findTypeMod from '../../utils/findType';

import { Configurable } from './Configurable';

/**
 * @group node
 */
describe('Configurable.ts', () => {
  function mockAllDeps() {
    const rawAbiType: JsonAbiType = {
      typeId: 1,
      type: 'mockType',
      components: null,
      typeParameters: null,
    };

    const type: IType = {
      name: 'mockType',
      attributes: {
        inputLabel: 'mockType',
        outputLabel: 'mockType',
      },
      rawAbiType,
      requiredFuelsMembersImports: [],
      parseComponentsAttributes: vi.fn(),
    };

    const findType = vi
      .spyOn(findTypeMod, 'findType')
      .mockImplementation(vi.fn().mockReturnValue(type));

    return {
      type,
      findType,
    };
  }

  it('should get configurable declaration with type', () => {
    const { type, findType } = mockAllDeps();
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE);

    const { configurables } = project.abiContents;

    const types: IType[] = [type];
    const rawAbiConfigurable = configurables[0];

    const configurable = new Configurable({ types, rawAbiConfigurable });

    expect(findType).toHaveBeenCalledTimes(1);
    expect(configurable.name).toEqual('FEE');
    expect(configurable.inputLabel).toEqual('mockType');
  });
});
