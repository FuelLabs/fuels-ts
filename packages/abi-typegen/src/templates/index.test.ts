import { contractPaths } from '../../test/fixtures';
import indexTemplate from '../../test/fixtures/templates/index.hbs';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import { Abi } from '../Abi';

import { renderIndexTemplate } from '.';

describe('templates/index', () => {
  test('should render index template', () => {
    const contractPath = contractPaths.minimal;
    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderIndexTemplate({ abis: [abi] });

    expect(rendered).toEqual(indexTemplate);
  });
});
