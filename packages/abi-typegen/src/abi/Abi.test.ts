import { safeExec } from '@fuel-ts/errors/test-utils';

import { AbiTypegenProjectsEnum } from '../../test/fixtures/forc-projects/index';
import { createAbisForTests } from '../../test/utils/createAbiForTests';
import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { JsonAbi } from '../types/interfaces/JsonAbi';

import { Abi } from './Abi';

/**
 * @group node
 */
describe('Abi.ts', () => {
  /*
    Tests
  */
  test('should create a new abi instance and parse root nodes', () => {
    const [abi] = createAbisForTests(ProgramTypeEnum.PREDICATE, [AbiTypegenProjectsEnum.PREDICATE]);

    expect(abi.metadataTypes.length).toBeGreaterThan(0);
    expect(abi.concreteTypes.length).toBeGreaterThan(0);
    expect(abi.functions.length).toBeGreaterThan(0);

    const [abiWithConfigurable] = createAbisForTests(ProgramTypeEnum.PREDICATE, [
      AbiTypegenProjectsEnum.PREDICATE_WITH_CONFIGURABLE,
    ]);

    expect(abiWithConfigurable.configurables.length).toBeGreaterThan(0);
  });

  test('should compute array of custom types in use', () => {
    const [abi] = createAbisForTests(ProgramTypeEnum.CONTRACT, [AbiTypegenProjectsEnum.FULL]);

    expect(abi.commonTypesInUse).toEqual(['Option', 'Enum', 'Vec', 'Result']);
  });

  test('should throw if contract name can not be obtained', async () => {
    const fn = () =>
      new Abi({
        filepath: '',
        programType: ProgramTypeEnum.CONTRACT,
        rawContents: {} as JsonAbi,
        outputDir: './dir',
      });

    const { error, result } = await safeExec(fn);

    const expectedErrorMsg = `Could not parse name from ABI file: .`;
    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(expectedErrorMsg);
  });
});
