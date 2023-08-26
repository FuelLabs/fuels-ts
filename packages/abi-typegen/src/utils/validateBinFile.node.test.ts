import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';

import { validateBinFile } from './validateBinFile';

/**
 * @group node
 */
describe('validateBinFile.ts', () => {
  test('should not throw for existent Script BIN file', () => {
    const params = {
      abiFilepath: 'script-abi.json',
      binExists: true,
      binFilepath: 'script.bin',
      programType: ProgramTypeEnum.SCRIPT,
    };

    expect(() => validateBinFile(params)).not.toThrow();
  });

  test('should not throw for non-existent Contract BIN file', () => {
    const params = {
      abiFilepath: './contract-abi.json',
      binExists: false,
      binFilepath: './contract.bin',
      programType: ProgramTypeEnum.CONTRACT,
    };

    expect(() => validateBinFile(params)).not.toThrow();
  });

  test('should throw for non-existent Script BIN file', () => {
    const params = {
      abiFilepath: './script-abi.json',
      binExists: false,
      binFilepath: './script.bin',
      programType: ProgramTypeEnum.SCRIPT,
    };

    expect(() => validateBinFile(params)).toThrowError(
      /Could not find BIN file for counterpart Script ABI./
    );
  });
});
