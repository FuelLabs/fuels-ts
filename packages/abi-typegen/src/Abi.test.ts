import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { compileSwayToJson } from '../test/utils/sway/compileSwayToJson';

import { Abi } from './Abi';
import type { IRawAbiTypeRoot } from './interfaces/IRawAbiType';
import * as renderDtsTemplateMod from './templates/dts';
import * as renderFactoryTemplateMod from './templates/factory';
import { EnumType } from './types/EnumType';
import { OptionType } from './types/OptionType';
import { VectorType } from './types/VectorType';
import * as parseFunctionsMod from './utils/parseFunctions';
import * as parseTypesMod from './utils/parseTypes';

/*
 * @group node/unit
 */

describe('Abi.ts', () => {
  /*
    Test helpers
  */
  function mockAllDeps() {
    const parseTypes = jest.spyOn(parseTypesMod, 'parseTypes').mockImplementation(() => []);

    const parseFunctions = jest
      .spyOn(parseFunctionsMod, 'parseFunctions')
      .mockImplementation(() => []);

    const renderDtsTemplate = jest
      .spyOn(renderDtsTemplateMod, 'renderDtsTemplate')
      .mockImplementation(() => 'dts');

    const renderFactoryTemplate = jest
      .spyOn(renderFactoryTemplateMod, 'renderFactoryTemplate')
      .mockImplementation(() => 'factory');

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

    expect(abi).toBeTruthy();
    expect(parseTypes).toHaveBeenCalledTimes(1);
    expect(parseFunctions).toHaveBeenCalledTimes(1);
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

    expect(abi).toBeTruthy();
    expect(renderDtsTemplate).toHaveBeenCalledTimes(1);
    expect(renderFactoryTemplate).toHaveBeenCalledTimes(1);
  });

  test('should compute array of custom types in use', async () => {
    const { abi } = getMockedAbi();

    // First: nothing (no types yet)
    abi.computeCommonTypesInUse();

    expect(abi).toBeTruthy();
    expect(abi.commonTypesInUse).toStrictEqual([]);

    // Second: Option
    abi.types = [new OptionType(getRawTypeFor({ type: 'option' }))];
    abi.computeCommonTypesInUse();

    expect(abi).toBeTruthy();
    expect(abi.commonTypesInUse).toStrictEqual(['Option']);

    // Second: Enum
    abi.types = [new EnumType(getRawTypeFor({ type: 'enum' }))];
    abi.computeCommonTypesInUse();

    expect(abi).toBeTruthy();
    expect(abi.commonTypesInUse).toStrictEqual(['Enum']);

    // Third: Vectors
    abi.types = [new VectorType(getRawTypeFor({ type: 'vector' }))];
    abi.computeCommonTypesInUse();

    expect(abi).toBeTruthy();
    expect(abi.commonTypesInUse).toStrictEqual(['Vec']);
  });

  test('should throw if contract name can not be obtained', async () => {
    const fn = () => getMockedAbi({ inputPath: '' });

    const { error, result } = await executeAndCatch(fn);

    const expectedErrorMsg = `Could not parse name from abi file: `;
    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(expectedErrorMsg);
  });
});
