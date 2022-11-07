import { ImportMock } from 'ts-mock-imports';

import { contractPaths } from '../../test/fixtures';
import { executeAndCatch } from '../../test/utils/executeAndCatch';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import * as renderDtsTemplateMod from '../templates/dts';
import * as renderFactoryTemplateMod from '../templates/factory';

import { Abi } from './Abi';
import * as parseFunctionsMod from './helpers/functions';
import * as parseTypesMod from './helpers/types';
import { EnumType } from './types/EnumType';
import { OptionType } from './types/OptionType';
import { VectorType } from './types/VectorType';

describe('Abi.ts', () => {
  /*
    Test helpers
  */
  function mockAllDeps() {
    ImportMock.restore();

    const { mockFunction: mf } = ImportMock;

    const parseTypes = mf(parseTypesMod, 'parseTypes', []);
    const parseFunctions = mf(parseFunctionsMod, 'parseFunctions', []);
    const renderDtsTemplate = mf(renderDtsTemplateMod, 'renderDtsTemplate', 'dts');
    const renderFactoryTemplate = mf(renderFactoryTemplateMod, 'renderFactoryTemplate', 'factory');

    return {
      parseTypes,
      parseFunctions,
      renderDtsTemplate,
      renderFactoryTemplate,
    };
  }

  function getMockedAbi(params: { inputPath: string } = { inputPath: '*-abi.json' }) {
    const mocks = mockAllDeps();

    const inputPath = params.inputPath;
    const outputDir = './out';

    const contractPath = contractPaths.minimal;
    const { rawContents } = compileSwayToJson({ contractPath });

    const abi = new Abi({
      filepath: inputPath,
      outputDir,
      rawContents,
    });

    return {
      abi,
      mocks,
    };
  }

  function getRawTypeFor(params: { type: string }) {
    const rawAbiType: IRawAbiTypeRoot = {
      typeId: 1,
      type: params.type,
      components: null,
      typeParameters: null,
    };
    return { rawAbiType };
  }

  /*
    Tests
  */
  test('should create a new abi instance and parse root nodes', async () => {
    const {
      abi,
      mocks: { parseTypes, parseFunctions },
    } = getMockedAbi();

    expect(abi).toBeTruthy;
    expect(parseTypes.callCount).toEqual(1);
    expect(parseFunctions.callCount).toEqual(1);
  });

  test('should get rendered DTS and Factory typescript code', async () => {
    const {
      abi,
      mocks: { renderDtsTemplate, renderFactoryTemplate },
    } = getMockedAbi();

    const dts = abi.getDtsDeclaration();
    const factory = abi.getFactoryDeclaration();

    expect(dts).toEqual('dts');
    expect(factory).toEqual('factory');

    expect(abi).toBeTruthy;
    expect(renderDtsTemplate.callCount).toEqual(1);
    expect(renderFactoryTemplate.callCount).toEqual(1);
  });

  test('should compute array of custom types in use', async () => {
    const { abi } = getMockedAbi();

    // First: nothing (no types yet)
    abi.computeCustomTypes();

    expect(abi).toBeTruthy;
    expect(abi.commonTypesInUse).toStrictEqual([]);

    // Second: Option
    abi.types = [new OptionType(getRawTypeFor({ type: 'option' }))];
    abi.computeCustomTypes();

    expect(abi).toBeTruthy;
    expect(abi.commonTypesInUse).toStrictEqual(['Option']);

    // Second: Enum
    abi.types = [new EnumType(getRawTypeFor({ type: 'enum' }))];
    abi.computeCustomTypes();

    expect(abi).toBeTruthy;
    expect(abi.commonTypesInUse).toStrictEqual(['Enum']);

    // Third: Vectors
    abi.types = [new VectorType(getRawTypeFor({ type: 'vector' }))];
    abi.computeCustomTypes();

    expect(abi).toBeTruthy;
    expect(abi.commonTypesInUse).toStrictEqual(['Vec']);
  });

  test('should throw if contract name can not be obtained', async () => {
    const fn = () => getMockedAbi({ inputPath: '' });

    const { error, result } = await executeAndCatch(fn);

    const expectedErrorMsg = `Could not parse name from abi file: `;
    expect(result).toBeFalsy;
    expect(error).toBeTruthy;
    expect(error?.message).toEqual(expectedErrorMsg);
  });
});
