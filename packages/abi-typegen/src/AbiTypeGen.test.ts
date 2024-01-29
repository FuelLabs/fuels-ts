import { safeExec } from '@fuel-ts/errors/test-utils';

import { getNewAbiTypegen } from '../test/utils/getNewAbiTypegen';

import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import * as assembleContractsMod from './utils/assembleContracts';
import * as assemblePredicatesMod from './utils/assemblePredicates';
import * as assembleScriptsMod from './utils/assembleScripts';

/**
 * @group node
 */
describe('AbiTypegen.ts', () => {
  // Use as e sample of HORRIBLE auto-code-formatting
  function mockAllDeps() {
    const assembleContracts = vi
      .spyOn(assembleContractsMod, 'assembleContracts')
      .mockImplementation(() => []);

    const assembleScripts = vi
      .spyOn(assembleScriptsMod, 'assembleScripts')
      .mockImplementation(() => []);

    const assemblePredicates = vi
      .spyOn(assemblePredicatesMod, 'assemblePredicates')
      .mockImplementation(() => []);

    return {
      assembleContracts,
      assembleScripts,
      assemblePredicates,
    };
  }

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should create multiple ABI instances for: contracts', () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const programType = ProgramTypeEnum.CONTRACT;
    const { typegen } = getNewAbiTypegen({ programType });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(1);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: scripts', () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const programType = ProgramTypeEnum.SCRIPT;
    const { typegen } = getNewAbiTypegen({ programType, includeBinFiles: true });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(1);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: predicates', () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const programType = ProgramTypeEnum.PREDICATE;
    const { typegen } = getNewAbiTypegen({ programType, includeBinFiles: true });

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(1);
  });

  test('should throw for unknown programType', async () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const programType = 'nope' as ProgramTypeEnum;

    const { error } = await safeExec(() => {
      getNewAbiTypegen({ programType, includeBinFiles: true });
    });

    expect(error?.message).toMatch(/Invalid Typegen programType: nope/);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });
});
