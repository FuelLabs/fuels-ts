import { contractPaths } from '../../../test/fixtures';
import factoryTemplate from '../../../test/fixtures/templates/script/factory.hbs';
import { executeAndCatch } from '../../../test/utils/executeAndCatch';
import { mockVersions } from '../../../test/utils/mockVersions';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import { Abi } from '../../abi/Abi';
import { CategoryEnum } from '../../types/enums/CategoryEnum';

import { renderFactoryTemplate } from './factory';

describe('factory.ts', () => {
  test('should render factory template', () => {
    const { restore } = mockVersions();

    const contractPath = contractPaths.script;

    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.SCRIPT,
    });

    const rendered = renderFactoryTemplate({ abi });

    restore();

    expect(rendered).toEqual(factoryTemplate);
  });

  test('should throw for invalid Script ABI', async () => {
    const { restore } = mockVersions();

    const contractPath = contractPaths.script;

    const { rawContents } = compileSwayToJson({ contractPath });

    // friction here (deletes 'main' function by emptying the functions array)
    rawContents.functions = [];

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      category: CategoryEnum.SCRIPT,
    });

    const { error } = await executeAndCatch(() => {
      renderFactoryTemplate({ abi });
    });

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);

    restore();
  });
});
