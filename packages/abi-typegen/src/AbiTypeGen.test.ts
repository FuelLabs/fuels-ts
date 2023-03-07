import { executeAndCatch } from '../test/utils/executeAndCatch';
import { getNewAbiTypegen } from '../test/utils/getNewAbiTypegen';

import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import * as assembleContractsMod from './utils/assembleContracts';
import * as assembleScriptsMod from './utils/assembleScripts';

describe('AbiTypegen.ts', () => {
  // Use as e sample of HORRIBLE auto-code-formatting
  function mockAllDeps() {
    const assembleContracts = jest
      .spyOn(assembleContractsMod, 'assembleContracts')
      .mockImplementation();

    const assembleScripts = jest.spyOn(assembleScriptsMod, 'assembleScripts').mockImplementation();

    return {
      assembleContracts,
      assembleScripts,
    };
  }

  beforeEach(jest.resetAllMocks);
  afterEach(jest.resetAllMocks);

  test('should create multiple ABI instances for: contracts', async () => {
    const { assembleContracts, assembleScripts } = mockAllDeps();

    const category = ProgramTypeEnum.CONTRACT;
    const { typegen } = getNewAbiTypegen({ category });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(1);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: scripts', async () => {
    const { assembleContracts, assembleScripts } = mockAllDeps();

    const category = ProgramTypeEnum.SCRIPT;
    const { typegen } = getNewAbiTypegen({ category, includeBinFiles: true });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(1);
  });

  test('should throw for unknown category', async () => {
    const { assembleContracts, assembleScripts } = mockAllDeps();

    const category = 'nope' as ProgramTypeEnum; // forced cast to cause error

    const { error } = await executeAndCatch(() => {
      getNewAbiTypegen({ category, includeBinFiles: true });
    });

    expect(error?.message).toMatch(/Invalid Typegen category: nope/);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
  });
});
