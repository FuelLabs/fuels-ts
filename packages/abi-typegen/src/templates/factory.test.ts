import { contractPaths } from '../../test/fixtures';
import factoryTemplate from '../../test/fixtures/templates/transpiled/factory.hbs';
import { mockVersions } from '../../test/utils/mockVersions';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import { Abi } from '../Abi';

import { renderFactoryTemplate } from './factory';

describe('templates/factory', () => {
  test('should render factory template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const contractPath = contractPaths.minimal;
    const { rawContents } = compileSwayToJson({ contractPath });

    // executing
    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderFactoryTemplate({ abi });

    // validating
    restore();

    expect(rendered).toEqual(factoryTemplate);
  });
});
