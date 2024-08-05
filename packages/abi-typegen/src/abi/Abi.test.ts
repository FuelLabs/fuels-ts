import { safeExec } from '@fuel-ts/errors/test-utils';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../test/fixtures/forc-projects/index';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { JsonAbiType } from '../types/interfaces/JsonAbi';
import * as parseFunctionsMod from '../utils/parseFunctions';
import * as parseTypesMod from '../utils/parseTypes';

import { Abi } from './Abi';
import { EnumType } from './types/EnumType';
import { OptionType } from './types/OptionType';
import { VectorType } from './types/VectorType';

/**
 * @group node
 */
describe('Abi.ts', () => {
  /*
    Test helpers
  */
  function mockAllDeps() {
    const parseTypes = vi.spyOn(parseTypesMod, 'parseTypes').mockImplementation(() => []);

    const parseFunctions = vi
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

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL);
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
    const rawAbiType: JsonAbiType = {
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
  test('should create a new abi instance and parse root nodes', () => {
    const {
      abi,
      mocks: { parseTypes, parseFunctions },
    } = getMockedAbi();

    expect(abi).toBeTruthy();
    expect(parseTypes).toHaveBeenCalledTimes(1);
    expect(parseFunctions).toHaveBeenCalledTimes(1);
  });

  test('should compute array of custom types in use', () => {
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

    const { error, result } = await safeExec(fn);

    const expectedErrorMsg = `Could not parse name from ABI file: .`;
    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(expectedErrorMsg);
  });
});
