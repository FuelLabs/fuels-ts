import { contractPaths } from '../../../test/fixtures';
import factoryTemplate from '../../../test/fixtures/templates/script/factory.hbs';
import { executeAndCatch } from '../../../test/utils/executeAndCatch';
import { getNewAbiTypegen } from '../../../test/utils/getNewAbiTypegen';
import { mockVersions } from '../../../test/utils/mockVersions';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import { Abi } from '../../abi/Abi';

import { renderFactoryTemplate } from './factory';

describe('factory.ts', () => {
  test('should render factory template', () => {
    const { restore } = mockVersions();

    const contractPath = contractPaths.minimal;

    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-script-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const rendered = renderFactoryTemplate({ abi });

    restore();

    expect(rendered).toEqual(factoryTemplate);
  });

  test('should throw for invalid Script ABI', async () => {
    const { restore } = mockVersions();

    const { rawContents } = getNewAbiTypegen({
      includeMainFunction: false, // friction here
    }).typegen.abis[0];

    const abi = new Abi({
      filepath: './my-script-abi.json',
      outputDir: 'stdout',
      rawContents,
    });

    const { error } = await executeAndCatch(() => {
      renderFactoryTemplate({ abi });
    });

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);

    restore();
  });
});
