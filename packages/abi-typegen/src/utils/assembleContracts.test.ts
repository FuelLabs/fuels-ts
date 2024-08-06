import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderMainTemplateMod from '../templates/contract/main';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { assembleContracts } from './assembleContracts';

/**
 * @group node
 */
describe('assembleContracts.ts', () => {
  function mockAllDeps() {
    vi.resetAllMocks();

    const renderCommonTemplate = vi
      .spyOn(renderCommonTemplateMod, 'renderCommonTemplate')
      .mockReturnValue('');

    const renderFactoryTemplate = vi
      .spyOn(renderMainTemplateMod, 'renderMainTemplate')
      .mockReturnValue('');

    const renderIndexTemplate = vi
      .spyOn(renderIndexTemplateMod, 'renderIndexTemplate')
      .mockReturnValue('');

    return {
      renderCommonTemplate,
      renderFactoryTemplate,
      renderIndexTemplate,
    };
  }

  test('should assemble all files from Contract ABI ', () => {
    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      programType: ProgramTypeEnum.CONTRACT,
      includeOptionType: false, // will prevent `common` template from being included
    });

    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assembleContracts({ abis, outputDir });

    expect(files.length).toEqual(5); // 2x main, 2x factory, 1x index

    expect(renderCommonTemplate).toHaveBeenCalledTimes(0);
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });

  test('should assemble all files from Contract ABI, including `common` file', () => {
    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      programType: ProgramTypeEnum.CONTRACT,
      includeOptionType: true, // will cause `common` template to be included
    });

    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assembleContracts({ abis, outputDir });

    expect(files.length).toEqual(6); // 2x main, 2x factory, 1x index, 1x common

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // must have been called
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });
});
