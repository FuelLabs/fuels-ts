import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { formatConfigurables } from './formatConfigurables';

/**
 * @group node
 */
describe('formatConfigurables.ts', () => {
  it('should format a configurable instance', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE);
    const abi = new Abi({
      filepath: './enum-simple-abi.json',
      outputDir: './contracts',
      rawContents: project.abiContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const { formattedConfigurables } = formatConfigurables({ configurables: abi.configurables });
    const formattedConfigurable = formattedConfigurables[0];

    expect(formattedConfigurable.configurableName).toEqual('FEE');
    expect(formattedConfigurable.configurableType).toEqual('BigNumberish');
  });
});
