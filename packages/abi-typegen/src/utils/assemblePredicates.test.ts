import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderFactoryTemplateMod from '../templates/predicate/factory';
import { CategoryEnum } from '../types/enums/CategoryEnum';

import { assemblePredicates } from './assemblePredicates';

describe('assemblePredicates.ts', () => {
  function mockAllDeps() {
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

  beforeEach(jest.resetAllMocks);
  afterEach(jest.restoreAllMocks);

  test('should assemble all files from Predicate ABI ', () => {
    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      category: CategoryEnum.SCRIPT,
      includeOptionType: false, // will prevent common template from being included
      includeMainFunction: true,
      includeBinFiles: true,
    });

    jest.resetAllMocks();

    const files = assemblePredicates({ abis, outputDir });

    expect(files.length).toEqual(3); // 2x factories, 1x index

    expect(renderCommonTemplate).toHaveBeenCalledTimes(0); // never called
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });

  test('should assemble all files from Predicate ABI, including `common` file', () => {
    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      category: CategoryEnum.SCRIPT,
      includeOptionType: true, // will cause common template to be included
      includeMainFunction: true,
      includeBinFiles: true,
    });

    jest.resetAllMocks();

    const files = assemblePredicates({ abis, outputDir });

    expect(files.length).toEqual(4); // 2x factories, 1x index, 1x common

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // called once
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });
});
