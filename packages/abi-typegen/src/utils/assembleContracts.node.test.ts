import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderBytecodeTemplateMod from '../templates/contract/bytecode';
import * as renderFactoryTemplateMod from '../templates/contract/factory';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

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

    const renderBytecodeTemplate = jest
      .spyOn(renderBytecodeTemplateMod, 'renderBytecodeTemplate')
      .mockImplementation();

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
