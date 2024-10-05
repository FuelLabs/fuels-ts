import { safeExec } from '@fuel-ts/errors/test-utils';
import * as utilsMod from '@fuel-ts/utils';
import { join } from 'path';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import mainTemplate from '../../../test/fixtures/templates/script/main.hbs';
import mainTemplateWithConfigurables from '../../../test/fixtures/templates/script-with-configurable/main.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { autoUpdateFixture } from '../../../test/utils/updateFixture';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderMainTemplate } from './main';

const mockAll = () => {
  vi.spyOn(utilsMod, 'compressBytecode').mockReturnValueOnce('0x-original-bytecode-here');
  vi.spyOn(utilsMod, 'compressBytecode').mockReturnValueOnce('0x-loaded-bytecode-here');
};

/**
 * @group node
 */
describe('main.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render main template', () => {
    mockAll();

    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedOriginalBinContents: '0x000',
      hexlifiedLoaderBinContents: '0x001',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.SCRIPT,
    });

    let rendered = renderMainTemplate({ abi, versions });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/script/main.hbs'),
      rendered
    );

    restore();

    expect(rendered).toEqual(mainTemplate);
  });

  test('should render main template with configurables', () => {
    mockAll();

    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT_WITH_CONFIGURABLE);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedOriginalBinContents: '0x000',
      hexlifiedLoaderBinContents: '0x001',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.SCRIPT,
    });

    let rendered = renderMainTemplate({ abi, versions });

    rendered = autoUpdateFixture(
      join(__dirname, '../../../test/fixtures/templates/script-with-configurable/main.hbs'),
      rendered
    );

    restore();

    expect(rendered).toEqual(mainTemplateWithConfigurables);
  });

  test('should throw for invalid Script ABI', async () => {
    const { versions, restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);
    const rawContents = project.abiContents;

    // ALERT: friction here (emptying functions array)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rawContents.functions = [];

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedOriginalBinContents: '0x000',
      hexlifiedLoaderBinContents: '0x001',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.SCRIPT,
    });

    const { error } = await safeExec(() => {
      renderMainTemplate({ abi, versions });
    });

    restore();

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);
  });
});
