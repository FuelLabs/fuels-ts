import { contractPaths } from '../../../test/fixtures';
import factoryTemplate from '../../../test/fixtures/templates/script/factory.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import { Abi } from '../../Abi';

import { renderFactoryTemplate } from './factory';

describe('factory.ts', () => {
  test('should render factory template', () => {
    const { restore } = mockVersions();

    const contractPath = contractPaths.minimal;

    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderFactoryTemplate({ abi });

    restore();

    // console.log(rendered);

    expect(rendered).toEqual(factoryTemplate);
  });
});
