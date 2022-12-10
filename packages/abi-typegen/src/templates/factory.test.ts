import { contractPaths } from '../../test/fixtures';
import factoryTemplate from '../../test/fixtures/templates/factory.hbs';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import { Abi } from '../Abi';

import { renderFactoryTemplate } from './factory';

describe('templates/factory', () => {
  test('should render factory template', () => {
    const contractPath = contractPaths.minimal;
    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderFactoryTemplate({ abi });

    expect(rendered).toEqual(factoryTemplate);
  });
});
