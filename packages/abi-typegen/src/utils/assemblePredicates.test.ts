import { AbiTypegenProjectsEnum } from '../../test/fixtures/forc-projects';
import { createAbisForTests } from '../../test/utils/createAbiForTests';
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

    const files = assemblePredicates(
      createAbisForTests(ProgramTypeEnum.PREDICATE, [
        AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE,
      ])
    );

    expect(files.length).toEqual(2); // 1x factories, 1x index

    expect(renderCommonTemplate).toHaveBeenCalledTimes(0); // never called
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(1);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });

  test('should assemble all files from Predicate ABI, including `common` file', () => {
    const { renderCommonTemplate, renderFactoryTemplate, renderIndexTemplate } = mockAllDeps();

    const files = assemblePredicates(
      createAbisForTests(ProgramTypeEnum.PREDICATE, [
        AbiTypegenProjectsEnum.PREDICATE, // uses Option
        AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE,
      ])
    );

    expect(files.length).toEqual(4); // 2x factories, 1x index, 1x common

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // called once
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
  });
});
