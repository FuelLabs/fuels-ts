import { hexlify } from '@ethersproject/bytes';
import { readFileSync } from 'fs';

import { getProjectResources, ForcProjectsEnum } from '../../test/fixtures/forc-projects';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { collectBinFilepaths } from './collectBinFilePaths';
import * as validateBinFileMod from './validateBinFile';

describe('collectBinFilePaths.ts', () => {
  const script = getProjectResources(ForcProjectsEnum.SCRIPT);
  const predicate = getProjectResources(ForcProjectsEnum.PREDICATE);
  const contract = getProjectResources(ForcProjectsEnum.MINIMAL);

  function mockDeps() {
    const validateBinFile = jest.spyOn(validateBinFileMod, 'validateBinFile').mockImplementation();

    return { validateBinFile };
  }

  afterEach(jest.restoreAllMocks);

  test('should collect bin files for Scripts', () => {
    const { validateBinFile } = mockDeps();

    const params = {
      filepaths: [script.abiPath],
      programType: ProgramTypeEnum.SCRIPT,
    };

    const binFilepaths = collectBinFilepaths(params);

    const path = script.abiPath.replace('-abi.json', '.bin');
    const contents = hexlify(readFileSync(path));

    expect(binFilepaths).toStrictEqual([{ contents, path }]);
    expect(validateBinFile).toHaveBeenCalledTimes(1);
  });

  test('should collect bin files for Predicates', () => {
    const { validateBinFile } = mockDeps();

    const params = {
      filepaths: [predicate.abiPath],
      programType: ProgramTypeEnum.PREDICATE,
    };

    const path = predicate.abiPath.replace('-abi.json', '.bin');
    const contents = hexlify(readFileSync(path));

    const binFilepaths = collectBinFilepaths(params);

    expect(binFilepaths).toStrictEqual([{ contents, path }]);
    expect(validateBinFile).toHaveBeenCalledTimes(1);
  });

  test('should not collect bin files for Contracts', () => {
    const { validateBinFile } = mockDeps();

    const params = {
      filepaths: [contract.abiPath],
      programType: ProgramTypeEnum.CONTRACT,
    };

    const binFilepaths = collectBinFilepaths(params);

    expect(binFilepaths).toStrictEqual([]); // empty array
    expect(validateBinFile).toHaveBeenCalledTimes(0); // zero calls this time
  });
});
