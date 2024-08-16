import { safeExec } from '@fuel-ts/errors/test-utils';
import * as utilsMod from '@fuel-ts/utils';
import { join } from 'path';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import mainTemplate from '../../../test/fixtures/templates/predicate/main.hbs';
import mainWithConfigurablesTemplate from '../../../test/fixtures/templates/predicate-with-configurable/main.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { autoUpdateFixture } from '../../../test/utils/updateFixture';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderMainTemplate } from './main';

/**
 * @group node
 */
describe('main.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render main template', () => {
    vi.spyOn(utilsMod, 'compressBytecode').mockReturnValueOnce('0x-bytecode-here');

    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE);

    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    let rendered = renderMainTemplate({ abi, versions });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/predicate/main.hbs'),
      rendered
    );

    restore();

    expect(rendered).toEqual(mainTemplate);
  });

  test('should render main template with configurable', () => {
    vi.spyOn(utilsMod, 'compressBytecode').mockReturnValueOnce('0x-bytecode-here');

    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE);

    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    let rendered = renderMainTemplate({ abi, versions });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/predicate-with-configurable/main.hbs'),
      rendered
    );

    restore();

    expect(rendered).toEqual(mainWithConfigurablesTemplate);
  });

  test('should throw for invalid Predicate ABI', async () => {
    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE);
    const rawContents = project.abiContents;

    // ALERT: friction here (emptying functions array)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rawContents.functions = [];

    const abi = new Abi({
      filepath: './my-predicate-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.PREDICATE,
    });

    const { error } = await safeExec(() => {
      renderMainTemplate({ abi, versions });
    });

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);

    restore();
  });
});
