import { getForcProject } from '@fuel-ts/utils/test-utils';
import { join } from 'path';

import expectedDtsFullTemplate from '../../../test/fixtures/templates-callpaths/contract/dts.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';
import type { IRawAbi } from '../../types/interfaces/IRawAbi';

import { renderDtsTemplate } from './dts';

/**
 * @group node
 */
describe('templates/dts', () => {
  test('should render dts template', () => {
    // mocking
    const { restore } = mockVersions();

    // executing
    const project = getForcProject({
      build: 'release',
      projectName: 'full',
      projectDir: join(
        process.cwd(),
        '/packages/abi-typegen/test/fixtures/forc-projects-callpaths/full'
      ),
    });
    const { abiContents } = project;

    const abi = new Abi({
      filepath: './my-contract-abi.json',
      outputDir: 'stdout',
      rawContents: abiContents as IRawAbi,
      programType: ProgramTypeEnum.CONTRACT,
    });

    const rendered = renderDtsTemplate({ abi });

    // validating
    restore();

    expect(rendered).toEqual(expectedDtsFullTemplate);
  });
});
