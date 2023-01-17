import { Abi } from './Abi';
import { AbiTypeGen } from './AbiTypeGen';
import type { IFile } from './interfaces/IFile';
import * as renderCommonTemplateMod from './templates/common/common';
import * as renderIndexTemplateMod from './templates/contract/index';

describe('AbiTypegen.ts', () => {
  /*
    Test helpers
  */
  function mockAll() {
    // mocking ABI class, methods and properties

    const getDtsDeclaration = jest.fn(() => 'dts');
    const getFactoryDeclaration = jest.fn(() => 'factory');

    jest.spyOn(Abi.prototype, 'getDtsDeclaration').mockImplementation(getDtsDeclaration);
    jest.spyOn(Abi.prototype, 'getFactoryDeclaration').mockImplementation(getFactoryDeclaration);

    // mocking mehtod helpers
    const renderCommonTemplate = jest
      .spyOn(renderCommonTemplateMod, 'renderCommonTemplate')
      .mockImplementation();

    const renderIndexTemplate = jest
      .spyOn(renderIndexTemplateMod, 'renderIndexTemplate')
      .mockImplementation();

    return {
      getDtsDeclaration,
      getFactoryDeclaration,
      renderCommonTemplate,
      renderIndexTemplate,
    };
  }

  function getNewAbiTypegen(includeOptionType: boolean = false) {
    const optionTypes = [
      {
        typeId: 1,
        type: 'enum Option',
        components: [
          {
            name: 'None',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'Some',
            type: 2,
            typeArguments: null,
          },
        ],
        typeParameters: [2],
      },
      {
        typeId: 2,
        type: 'generic T',
        components: null,
        typeParameters: null,
      },
    ];

    const types = includeOptionType ? optionTypes : [];

    const stubAbi = JSON.stringify({ types, functions: [] }, null, 2);

    const abiFiles: IFile[] = [
      {
        path: './first-abi.json',
        contents: stubAbi,
      },
      {
        path: './second-abi.json',
        contents: stubAbi,
      },
    ];

    const outputDir = './contracts';

    const typegen = new AbiTypeGen({ abiFiles, outputDir });

    return { typegen };
  }

  /*
    Tests
  */
  test('should create multiple ABI instances', async () => {
    mockAll();

    // causes `common.d.ts` to be excluded
    const { typegen } = getNewAbiTypegen(false);

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2); // 2x abi files
    expect(typegen.files.length).toEqual(5); // 2x dts + 2x factories + 1x index
  });

  test('should conditionally include `common.d.ts` file', async () => {
    // causes `common.d.ts` to be included
    const mocks = mockAll();

    const { typegen } = getNewAbiTypegen(true);

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);
    expect(typegen.files.length).toEqual(6); // 2x dts + 1x factory + 1x common + 1x index

    expect(mocks.getDtsDeclaration).toHaveBeenCalled();
    expect(mocks.getFactoryDeclaration).toHaveBeenCalled();
    expect(mocks.renderIndexTemplate).toHaveBeenCalled();
    expect(mocks.renderCommonTemplate).toHaveBeenCalled();
  });
});
