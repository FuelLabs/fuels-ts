import { AbiTypegenProjectsEnum } from '../../test/fixtures/forc-projects';
import { createAbisForTests } from '../../test/utils/createAbiForTests';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderFactoryTemplateMod from '../templates/script/factory';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { assembleScripts } from './assembleScripts';

/**
 * @group node
 */
describe('assembleScripts.ts', () => {
  function mockAllDeps() {
    const renderCommonTemplate = vi
      .spyOn(renderCommonTemplateMod, 'renderCommonTemplate')
      .mockResolvedValue('');

    const renderFactoryTemplate = vi
      .spyOn(renderFactoryTemplateMod, 'renderFactoryTemplate')
      .mockResolvedValue('');

    const renderIndexTemplate = vi
      .spyOn(renderIndexTemplateMod, 'renderIndexTemplate')
      .mockResolvedValue('');

    return {
      renderCommonTemplate,
      renderFactoryTemplate,
      renderIndexTemplate,
    };
  }

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should assemble all files from Script ABI ', () => {
    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assembleScripts(
      createAbisForTests(ProgramTypeEnum.SCRIPT, [AbiTypegenProjectsEnum.SCRIPT_WITH_CONFIGURABLE])
    );

    expect(files.length).toEqual(2); // 1x factories, 1x index

    expect(renderCommonTemplate).toHaveBeenCalledTimes(0); // never called
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(1);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });

  test('should assemble all files from Script ABI, including `common` file', () => {
    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assembleScripts(
      createAbisForTests(ProgramTypeEnum.SCRIPT, [
        AbiTypegenProjectsEnum.SCRIPT, // uses Option
        AbiTypegenProjectsEnum.SCRIPT_WITH_CONFIGURABLE,
      ])
    );

    expect(files.length).toEqual(4); // 2x factories, 1x index, 1x common

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // called once
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });
});
