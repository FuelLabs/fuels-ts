import { getProjectResources, ForcProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import factoryTemplate from '../../../test/fixtures/templates/contract/factory.hbs';
import { updateVersions } from '../../../test/utils/updateVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderFactoryTemplate } from './factory';

/**
 * @group node
 */
describe('templates/factory', () => {
  test('should render factory template', () => {
    const project = getProjectResources(ForcProjectsEnum.MINIMAL);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderFactoryTemplate({ abi });

    expect(rendered).toEqual(updateVersions(factoryTemplate));
  });
});
