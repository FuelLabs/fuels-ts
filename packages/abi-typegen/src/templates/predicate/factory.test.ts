import { safeExec } from '@fuel-ts/errors/test-utils';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import factoryTemplate from '../../../test/fixtures/templates/predicate/factory.hbs';
import factoryWithConfigurablesTemplate from '../../../test/fixtures/templates/predicate-with-configurable/factory.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderFactoryTemplate } from './factory';

/**
 * @group node
 */
describe('factory.ts', () => {
  test('should render factory template', () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE);

    const rawContents = project.abiContents;

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

  test('should render factory template with configurable', () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE);

    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const rendered = renderFactoryTemplate({ abi });

    restore();

    expect(rendered).toEqual(factoryWithConfigurablesTemplate);
  });

  test('should throw for invalid Predicate ABI', async () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE);
    const rawContents = project.abiContents;

    // friction here (deletes 'main' function by emptying the functions array)
    rawContents.functions = [];

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const { error } = await safeExec(() => {
      renderFactoryTemplate({ abi });
    });

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);

    restore();
  });
});
