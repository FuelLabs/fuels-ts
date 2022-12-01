import { ImportMock } from 'ts-mock-imports';

import * as AbiMod from './Abi';
import { AbiTypeGen } from './AbiTypeGen';
import type { IFile } from './interfaces/IFile';
import * as renderCommonTemplateMod from './templates/common';
import * as renderIndexTemplateMod from './templates/index';

describe('AbiTypegen.ts', () => {
  /*
    Test helpers
  */
  function mockAll() {
    ImportMock.restore();

    // mocking ABI class, methods and properties
    const Abi = ImportMock.mockClass(AbiMod, 'Abi');

    const getDtsDeclaration = Abi.mock('getDtsDeclaration', 'DTS');
    const getFactoryDeclaration = Abi.mock('getFactoryDeclaration', 'FACTORY');

    Abi.set('dtsFilepath', 'DTS_FILEPATH');
    Abi.set('factoryFilepath', 'FACTORY_FILEPATH');
    Abi.set('commonTypesInUse', []);

    // mocking mehtod helpers
    const renderCommonTemplate = ImportMock.mockFunction(
      renderCommonTemplateMod,
      'renderCommonTemplate'
    );

    const renderIndexTemplate = ImportMock.mockFunction(
      renderIndexTemplateMod,
      'renderIndexTemplate'
    );

    return {
      Abi,
      getDtsDeclaration,
      getFactoryDeclaration,
      renderCommonTemplate,
      renderIndexTemplate,
    };
  }

  function getNewAbiTypegen() {
    const stubAbi = JSON.stringify({ types: [], functions: [] }, null, 2);

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
    const mocks = mockAll();

    // this causes `common.d.ts` to NOT be included.
    mocks.Abi.set('commonTypesInUse', []);

    const { typegen } = getNewAbiTypegen();

    expect(typegen).toBeTruthy;
    expect(typegen.abis.length).toEqual(2); // 2x abi files
    expect(typegen.files.length).toEqual(5); // 2x dts + 2x factories + 1x index
  });

  test('should conditiolnally include `common.d.ts` file', async () => {
    const mocks = mockAll();

    // this causes `common.d.ts` to BE included
    mocks.Abi.set('commonTypesInUse', ['Enum']);

    const { typegen } = getNewAbiTypegen();

    expect(typegen).toBeTruthy;
    expect(typegen.abis.length).toEqual(2);
    expect(typegen.files.length).toEqual(6); // 2x dts + 1x factory + 1x common + 1x index

    expect(mocks.getDtsDeclaration.callCount).toBeGreaterThan(0);
    expect(mocks.getFactoryDeclaration.callCount).toBeGreaterThan(0);
    expect(mocks.renderIndexTemplate.callCount).toBeGreaterThan(0);
    expect(mocks.renderCommonTemplate.callCount).toBeGreaterThan(0);
  });
});
