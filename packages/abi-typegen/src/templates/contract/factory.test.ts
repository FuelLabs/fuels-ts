import { join } from 'path';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import factoryTemplate from '../../../test/fixtures/templates/contract/factory.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { autoUpdateFixture } from '../../../test/utils/updateFixture';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderFactoryTemplate } from './factory';

/**
 * @group node
 */
describe('templates/factory', () => {
  test('should render factory template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL);
    const rawContents = project.abiContents;

    // executing
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      hexlifiedBinContents: '0x-bytecode-here',
      programType: ProgramTypeEnum.CONTRACT,
    });

    let rendered = renderFactoryTemplate({ abi });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/contract/factory.hbs'),
      rendered
    );

    // validating
    restore();

    expect(rendered).toEqual(factoryTemplate);
  });
});
