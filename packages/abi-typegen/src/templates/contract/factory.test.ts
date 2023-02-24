import { contractPaths } from '../../../test/fixtures';
import factoryTemplate from '../../../test/fixtures/templates/contract/factory.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { buildSway } from '../../../test/utils/sway/buildSway';
import { Abi } from '../../abi/Abi';
import { CategoryEnum } from '../../types/enums/CategoryEnum';

import { renderFactoryTemplate } from './factory';

describe('templates/factory', () => {
  test('should render factory template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const contractPath = contractPaths.minimal;
    const { rawContents } = buildSway({ contractPath });

    // executing
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.CONTRACT,
    });

    const rendered = renderFactoryTemplate({ abi });

    // validating
    restore();

    expect(rendered).toEqual(factoryTemplate);
  });
});
