import { getNewAbiTypegen } from '../../test/utils/getNewAbiTypegen';
import * as renderCommonTemplateMod from '../templates/common/common';
import * as renderIndexTemplateMod from '../templates/common/index';
import * as renderBytecodeTemplateMod from '../templates/contract/bytecode';
import * as renderFactoryTemplateMod from '../templates/contract/factory';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { assembleContracts } from './assembleContracts';

function mockAllDeps() {
  vi.mock('../templates/common/common', async () => {
    const mod = await vi.importActual('../templates/common/common');
    return {
      __esModule: true,
      ...mod,
      renderCommonTemplate: vi.fn(),
    };
  });

  vi.mock('../templates/common/index', async () => {
    const mod = await vi.importActual('../templates/common/index');
    return {
      __esModule: true,
      ...mod,
      renderIndexTemplate: vi.fn(),
    };
  });

  vi.mock('../templates/contract/bytecode', async () => {
    const mod = await vi.importActual('../templates/contract/bytecode');
    return {
      __esModule: true,
      ...mod,
      renderBytecodeTemplate: vi.fn(),
    };
  });

  vi.mock('../templates/contract/factory', async () => {
    const mod = await vi.importActual('../templates/contract/factory');
    return {
      __esModule: true,
      ...mod,
      renderFactoryTemplate: vi.fn(),
    };
  });

  const renderCommonTemplate = vi.spyOn(renderCommonTemplateMod, 'renderCommonTemplate');
  const renderFactoryTemplate = vi.spyOn(renderFactoryTemplateMod, 'renderFactoryTemplate');
  const renderIndexTemplate = vi.spyOn(renderIndexTemplateMod, 'renderIndexTemplate');
  const renderBytecodeTemplate = vi.spyOn(renderBytecodeTemplateMod, 'renderBytecodeTemplate');

  return {
    renderCommonTemplate,
    renderFactoryTemplate,
    renderIndexTemplate,
    renderBytecodeTemplate,
  };
}

mockAllDeps();

/**
 * @group node
 */
describe('assembleContracts.ts', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

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
