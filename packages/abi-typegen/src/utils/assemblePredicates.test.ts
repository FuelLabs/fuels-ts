import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderFactoryTemplateMod from '../templates/predicate/factory';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { assemblePredicates } from './assemblePredicates';

/**
 * @group node
 */
describe('assemblePredicates.ts', () => {
  function mockAllDeps() {
    const renderCommonTemplate = vi
      .spyOn(renderCommonTemplateMod, 'renderCommonTemplate')
      .mockImplementation(vi.fn().mockResolvedValue(''));

    const renderFactoryTemplate = vi
      .spyOn(renderFactoryTemplateMod, 'renderFactoryTemplate')
      .mockImplementation(vi.fn().mockResolvedValue(''));

    const renderIndexTemplate = vi
      .spyOn(renderIndexTemplateMod, 'renderIndexTemplate')
      .mockImplementation(vi.fn().mockResolvedValue(''));

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

  test('should assemble all files from Predicate ABI ', () => {
    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      programType: ProgramTypeEnum.PREDICATE,
      includeOptionType: false, // will prevent common template from being included
      includeMainFunction: true,
      includeBinFiles: true,
    });

    vi.resetAllMocks();

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
      programType: ProgramTypeEnum.PREDICATE,
      includeOptionType: true, // will cause common template to be included
      includeMainFunction: true,
      includeBinFiles: true,
    });

    vi.resetAllMocks();

    const files = assemblePredicates({ abis, outputDir });

    expect(files.length).toEqual(4); // 2x factories, 1x index, 1x common

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // called once
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });
});
