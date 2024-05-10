import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderBytecodeTemplateMod from '../templates/contract/bytecode';
import * as renderFactoryTemplateMod from '../templates/contract/factory';
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
      .spyOn(renderFactoryTemplateMod, 'renderFactoryTemplate')
      .mockReturnValue('');

    const renderIndexTemplate = vi
      .spyOn(renderIndexTemplateMod, 'renderIndexTemplate')
      .mockReturnValue('');

    const renderBytecodeTemplate = vi
      .spyOn(renderBytecodeTemplateMod, 'renderBytecodeTemplate')
      .mockReturnValue('');

    return {
      renderCommonTemplate,
      renderFactoryTemplate,
      renderIndexTemplate,
      renderBytecodeTemplate,
    };
  }

  test('should assemble all files from Contract ABI ', () => {
    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      programType: ProgramTypeEnum.CONTRACT,
      includeOptionType: false, // will prevent `common` template from being included
    });

    const {
      renderCommonTemplate,
      renderFactoryTemplate,
      renderIndexTemplate,
      renderBytecodeTemplate,
    } = mockAllDeps();

    const files = assembleContracts({ abis, outputDir });

    expect(files.length).toEqual(7); // 2x dts, 2x factories, 1x index, 2x hex.ts (no `common`)

    expect(renderCommonTemplate).toHaveBeenCalledTimes(0);
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
    expect(renderBytecodeTemplate).toHaveBeenCalledTimes(2);
  });

  test('should assemble all files from Contract ABI, including `common` file', () => {
    const {
      typegen: { abis, outputDir },
    } = getNewAbiTypegen({
      programType: ProgramTypeEnum.CONTRACT,
      includeOptionType: true, // will cause `common` template to be included
    });

    const {
      renderCommonTemplate,
      renderFactoryTemplate,
      renderIndexTemplate,
      renderBytecodeTemplate,
    } = mockAllDeps();

    const files = assembleContracts({ abis, outputDir });

    expect(files.length).toEqual(8); // 2x dts, 2x factories, 1x index, 1x common, 2x hex.ts

    expect(renderCommonTemplate).toHaveBeenCalledTimes(1); // must have been called
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(2);
    expect(renderIndexTemplate).toHaveBeenCalledTimes(1);
    expect(renderBytecodeTemplate).toHaveBeenCalledTimes(2);
  });
});
