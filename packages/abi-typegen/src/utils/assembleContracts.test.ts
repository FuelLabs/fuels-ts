import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderFactoryTemplateMod from '../templates/contract/factory';
import { CategoryEnum } from '../types/enums/CategoryEnum';

import { assembleContracts } from './assembleContracts';

describe('assembleContracts.ts', () => {
  function mockAllDeps() {
    jest.resetAllMocks();

    const renderCommonTemplate = jest
      .spyOn(renderCommonTemplateMod, 'renderCommonTemplate')
      .mockImplementation();

    const renderFactoryTemplate = jest
      .spyOn(renderFactoryTemplateMod, 'renderFactoryTemplate')
      .mockImplementation();

    const renderIndexTemplate = jest
      .spyOn(renderIndexTemplateMod, 'renderIndexTemplate')
      .mockImplementation();

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
      category: CategoryEnum.CONTRACT,
      includeOptionType: false, // will prevent `common` template from being included
    });

    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assembleContracts({ abis, outputDir });

    expect(files.length).toEqual(5); // 2x dts, 2x factories, 1x index (no `common`)

    expect(renderCommonTemplate).toHaveBeenCalledTimes(0);
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });

  test('should assemble all files from Contract ABI, including `common` file', () => {
    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      category: CategoryEnum.CONTRACT,
      includeOptionType: true, // will cause `common` template to be included
    });

    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assembleContracts({ abis, outputDir });

    expect(files.length).toEqual(6); // 2x dts, 2x factories, 1x index, 1x common

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // must have been called
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });
});
