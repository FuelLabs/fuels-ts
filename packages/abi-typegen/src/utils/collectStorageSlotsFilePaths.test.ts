import { getProjectResources, ForcProjectsEnum } from '../../test/fixtures/forc-projects';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { collectStorageSlotsFilepaths } from './collectStorageSlotsFilePaths';

describe('collectStorageSlotsFilePaths.ts', () => {
  const script = getProjectResources(ForcProjectsEnum.SCRIPT);
  const predicate = getProjectResources(ForcProjectsEnum.PREDICATE);
  const contract = getProjectResources(ForcProjectsEnum.MINIMAL);

  afterEach(jest.restoreAllMocks);

  test('should collect storage slot files', () => {
    const contractStorageSlots = collectStorageSlotsFilepaths({
      filepaths: [contract.abiPath],
      programType: ProgramTypeEnum.CONTRACT,
    });

    const predicateStorageSlots = collectStorageSlotsFilepaths({
      filepaths: [predicate.abiPath],
      programType: ProgramTypeEnum.PREDICATE,
    });

    const scriptStorageSlots = collectStorageSlotsFilepaths({
      filepaths: [script.abiPath],
      programType: ProgramTypeEnum.SCRIPT,
    });

    expect(contractStorageSlots.length).toEqual(1);
    expect(predicateStorageSlots.length).toEqual(0);
    expect(scriptStorageSlots.length).toEqual(0);
  });
});
