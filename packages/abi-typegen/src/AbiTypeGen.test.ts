import { executeAndCatch } from '../test/utils/executeAndCatch';
import { getNewAbiTypegen } from '../test/utils/getNewAbiTypegen';

import { CategoryEnum } from './types/enums/CategoryEnum';
import * as assembleContractsMod from './utils/assembleContracts';
import * as assemblePredicatesMod from './utils/assemblePredicates';
import * as assembleScriptsMod from './utils/assembleScripts';

describe('AbiTypegen.ts', () => {
  // Use as e sample of HORRIBLE auto-code-formatting
  function mockAllDeps() {
    const assembleContracts = jest
      .spyOn(assembleContractsMod, 'assembleContracts')
      .mockImplementation();

    const assembleScripts = jest.spyOn(assembleScriptsMod, 'assembleScripts').mockImplementation();

    const assemblePredicates = jest
      .spyOn(assemblePredicatesMod, 'assemblePredicates')
      .mockImplementation();

    return {
      assembleContracts,
      assembleScripts,
      assemblePredicates,
    };
  }

  beforeEach(jest.resetAllMocks);
  afterEach(jest.resetAllMocks);

  test('should create multiple ABI instances for: contracts', async () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const category = CategoryEnum.CONTRACT;
    const { typegen } = getNewAbiTypegen({ category });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(1);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: scripts', async () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const category = CategoryEnum.SCRIPT;
    const { typegen } = getNewAbiTypegen({ category, includeBinFiles: true });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(1);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: predicates', async () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const category = CategoryEnum.PREDICATE;
    const { typegen } = getNewAbiTypegen({ category, includeBinFiles: true });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(1);
  });

  test('should throw for unknown category', async () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const category = 'nope' as any;

    const { error } = await executeAndCatch(() => {
      getNewAbiTypegen({ category, includeBinFiles: true });
    });

    expect(error?.message).toMatch(/Invalid Typegen category: nope/);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });
});
