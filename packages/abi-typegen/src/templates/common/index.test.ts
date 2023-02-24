import { contractPaths } from '../../../test/fixtures';
import indexTemplate from '../../../test/fixtures/templates/contract/index.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { buildSway } from '../../../test/utils/sway/buildSway';
import { Abi } from '../../abi/Abi';
import { CategoryEnum } from '../../types/enums/CategoryEnum';

import { renderIndexTemplate } from './index';

describe('templates/index', () => {
  test('should render index template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const contractPath = contractPaths.minimal;
    const { rawContents } = buildSway({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.CONTRACT,
    });

    const rendered = renderIndexTemplate({ abis: [abi] });

    // validating
    restore();

    expect(rendered).toEqual(indexTemplate);
  });
});
