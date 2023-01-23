import { getNewAbiTypegen } from '../test/utils/getNewAbiTypegen';

import * as assembleContractsMod from './assemblers/assembleContracts';
import * as assembleScriptsMod from './assemblers/assembleScripts';
import { CategoryEnum } from './interfaces/CategoryEnum';

describe('AbiTypegen.ts', () => {
  // Use as example of HORRIBLE auto-code-formatting
  function mockAllDeps() {
    jest.resetAllMocks();

    const assembleContracts = jest
      .spyOn(assembleContractsMod, 'assembleContracts')
      .mockImplementation();
    const assembleScripts = jest.spyOn(assembleScriptsMod, 'assembleScripts').mockImplementation();

    return {
      assembleContracts,
      assembleScripts,
    };
  }

  test('should create multiple ABI instances for: contracts', async () => {
    const { assembleContracts, assembleScripts } = mockAllDeps();

    const category = CategoryEnum.CONTRACT;
    const { typegen } = getNewAbiTypegen({ category });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(1);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: scripts', async () => {
    const { assembleContracts, assembleScripts } = mockAllDeps();

    const category = CategoryEnum.SCRIPT;
    const { typegen } = getNewAbiTypegen({ category });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(1);
  });
});
