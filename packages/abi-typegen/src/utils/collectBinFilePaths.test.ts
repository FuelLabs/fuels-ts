import { hexlify } from 'ethers';
import { readFileSync } from 'fs';

import { AbiTypegenProjectsEnum, getTypegenForcProject } from '../../test/fixtures/forc-projects';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { collectBinFilepaths } from './collectBinFilePaths';
import * as validateBinFileMod from './validateBinFile';

/**
 * @group node
 */
describe('collectBinFilePaths.ts', () => {
  const script = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);
  const predicate = getTypegenForcProject(AbiTypegenProjectsEnum.PREDICATE);
  const contract = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL);

  function mockDeps() {
    const validateBinFile = vi
      .spyOn(validateBinFileMod, 'validateBinFile')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockResolvedValue({} as any);
    // const validateBinFile = vi.spyOn(validateBinFileMod, 'validateBinFile').getMockImplementation();

    return { validateBinFile };
  }

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  test('should collect bin files for Contracts', () => {
    const { validateBinFile } = mockDeps();

    const params = {
      filepaths: [contract.abiPath],
      programType: ProgramTypeEnum.CONTRACT,
    };

    const path = contract.abiPath.replace('-abi.json', '.bin');
    const contents = hexlify(readFileSync(path));

    const binFilepaths = collectBinFilepaths(params);

    expect(binFilepaths).toStrictEqual([{ contents, path }]);
    expect(validateBinFile).toHaveBeenCalledTimes(1);
  });
});
