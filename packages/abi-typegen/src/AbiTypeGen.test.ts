import { safeExec } from '@fuel-ts/errors/test-utils';

import { AbiTypegenProjectsEnum, getTypegenForcProject } from '../test/fixtures/forc-projects';

import { AbiTypeGen } from './AbiTypeGen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import type { IFile } from './types/interfaces/IFile';
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

  function createAbiTypeGen(programType: ProgramTypeEnum, projects: AbiTypegenProjectsEnum[]) {
    const abiFiles: IFile[] = [];
    const binFiles: IFile[] = [];
    const outputDir = './directory';

    projects.forEach((project) => {
      const { abiPath, abiContents, binPath, binHexlified } = getTypegenForcProject(project);
      abiFiles.push({ path: abiPath, contents: JSON.stringify(abiContents) });
      binFiles.push({ path: binPath, contents: binHexlified });
    });

    return new AbiTypeGen({
      abiFiles,
      binFiles,
      outputDir,
      programType,
      storageSlotsFiles: [],
    });
  }

  test('should create multiple ABI instances for: contracts', () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const typegen = createAbiTypeGen(ProgramTypeEnum.CONTRACT, [
      AbiTypegenProjectsEnum.FN_VOID,
      AbiTypegenProjectsEnum.MINIMAL,
    ]);

    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(1);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: scripts', () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const typegen = createAbiTypeGen(ProgramTypeEnum.SCRIPT, [
      AbiTypegenProjectsEnum.SCRIPT,
      AbiTypegenProjectsEnum.SCRIPT_WITH_CONFIGURABLE,
    ]);

    expect(typegen).toBeTruthy();
    expect(typegen.abis.length).toEqual(2);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(1);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });

  test('should create multiple ABI instances for: predicates', () => {
    const { assembleContracts, assembleScripts, assemblePredicates } = mockAllDeps();

    const typegen = createAbiTypeGen(ProgramTypeEnum.PREDICATE, [
      AbiTypegenProjectsEnum.PREDICATE,
      AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE,
    ]);

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
      createAbiTypeGen(programType, [
        AbiTypegenProjectsEnum.FN_VOID,
        AbiTypegenProjectsEnum.MINIMAL,
      ]);
    });

    expect(error?.message).toMatch(/Invalid Typegen programType: nope/);

    expect(assembleContracts).toHaveBeenCalledTimes(0);
    expect(assembleScripts).toHaveBeenCalledTimes(0);
    expect(assemblePredicates).toHaveBeenCalledTimes(0);
  });
});
