import { ForcProjectsEnum, getProjectResources } from '../../test/fixtures/forc-projects/index';
import { executeAndCatch } from '../../test/utils/executeAndCatch';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { IRawAbiTypeRoot } from '../types/interfaces/IRawAbiType';
import * as parseFunctionsMod from '../utils/parseFunctions';
import * as parseTypesMod from '../utils/parseTypes';

import { Abi } from './Abi';
import { EnumType } from './types/EnumType';
import { OptionType } from './types/OptionType';
import { VectorType } from './types/VectorType';

describe('Abi.ts', () => {
  /*
    Test helpers
  */
  function mockAllDeps() {
    const parseTypes = jest.spyOn(parseTypesMod, 'parseTypes').mockImplementation(() => []);

    const parseFunctions = jest
      .spyOn(parseFunctionsMod, 'parseFunctions')
      .mockImplementation(() => []);

    return {
      parseTypes,
      parseFunctions,
    };
  }

  function getMockedAbi(params: { inputPath: string } = { inputPath: '*-abi.json' }) {
    const mocks = mockAllDeps();

    const inputPath = params.inputPath;
    const outputDir = './out';

    const project = getProjectResources(ForcProjectsEnum.MINIMAL);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: inputPath,
      outputDir,
      rawContents,
      programType: ProgramTypeEnum.CONTRACT,
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
