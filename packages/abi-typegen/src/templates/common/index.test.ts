import { getProjectResources, ForcProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import indexTemplate from '../../../test/fixtures/templates/contract/index.hbs';
import { updateVersions } from '../../../test/utils/updateVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderIndexTemplate } from './index';

/**
 * @group node
 */
describe('templates/index', () => {
  test('should render index template', () => {
    // executing
    const project = getProjectResources(ForcProjectsEnum.MINIMAL);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderIndexTemplate({ abis: [abi] });

    expect(rendered).toEqual(updateVersions(indexTemplate));
  });
});
