import { contractPaths } from '../../../test/fixtures';
import indexTemplate from '../../../test/fixtures/templates/contract/index.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import { Abi } from '../../Abi';

import { renderIndexTemplate } from './index';

describe('templates/index', () => {
  test('should render index template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const contractPath = contractPaths.minimal;
    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderIndexTemplate({ abis: [abi] });

    // validating
    restore();

    expect(rendered).toEqual(indexTemplate);
  });
});
