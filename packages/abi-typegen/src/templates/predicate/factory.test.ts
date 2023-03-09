import { contractPaths } from '../../../test/fixtures/index';
import factoryTemplate from '../../../test/fixtures/templates/predicate/factory.hbs';
import { executeAndCatch } from '../../../test/utils/executeAndCatch';
import { mockVersions } from '../../../test/utils/mockVersions';
import { buildSway } from '../../../test/utils/sway/buildSway';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderFactoryTemplate } from './factory';

describe('factory.ts', () => {
  test('should render factory template', () => {
    const { restore } = mockVersions();

    const contractPath = contractPaths.predicate;

    const { rawContents } = buildSway({ contractPath });

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const rendered = renderFactoryTemplate({ abi });

    restore();

    expect(rendered).toEqual(factoryTemplate);
  });

  test('should throw for invalid Predicate ABI', async () => {
    const { restore } = mockVersions();

    const contractPath = contractPaths.predicate;
    const { rawContents } = buildSway({ contractPath });

    // friction here (deletes 'main' function by emptying the functions array)
    rawContents.functions = [];

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const { error } = await executeAndCatch(() => {
      renderFactoryTemplate({ abi });
    });

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);

    restore();
  });
});
