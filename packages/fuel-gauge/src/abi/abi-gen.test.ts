import { runTypegen } from '@fuel-ts/abi/cli';
import { randomUUID } from 'crypto';
import { cpSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync } from 'fs';
import { FuelError } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';
import { tmpdir } from 'os';
import { join } from 'path';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

function generateTmpDir(fromDir?: string) {
  const dir = join(tmpdir(), 'fuels', randomUUID());

  mkdirSync(dir, { recursive: true });

  if (fromDir) {
    cpSync(fromDir, dir, { recursive: true });
  }

  return { path: dir, [Symbol.dispose]: () => rmdirSync(dir, { recursive: true }) };
}

/**
 * @group node
 */
describe('AbiGen', () => {
  test('Generates all files correctly', () => {
    const fixtureResultMap = new Map([
      ['index', 'index.ts'],
      ['common', 'common.ts'],

      ['contracts/contract-index', 'contracts/index.ts'],
      ['contracts/contract', 'contracts/AbiContract.ts'],
      ['contracts/contract-types', 'contracts/AbiContractTypes.ts'],
      ['contracts/contract-factory', 'contracts/AbiContractFactory.ts'],
      ['contracts/contract-bytecode', 'contracts/AbiContract-bytecode.ts'],
      ['contracts/contract-abi', 'contracts/AbiContract-abi.ts'],
      ['contracts/contract-storage-slots', 'contracts/AbiContract-storage-slots.ts'],

      ['predicates/predicate-index', 'predicates/index.ts'],
      ['predicates/predicate', 'predicates/AbiPredicate.ts'],
      ['predicates/predicate-types', 'predicates/AbiPredicateTypes.ts'],
      ['predicates/predicate-abi', 'predicates/AbiPredicate-abi.ts'],

      ['scripts/script-index', 'scripts/index.ts'],
      ['scripts/script', 'scripts/AbiScript.ts'],
      ['scripts/script-types', 'scripts/AbiScriptTypes.ts'],
      ['scripts/script-abi', 'scripts/AbiScript-abi.ts'],
    ]);

    const { buildDir: contractDir } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    const { buildDir: predicateDir } = getAbiForcProject(AbiProjectsEnum.ABI_PREDICATE);
    const { abiPath: scriptAbiPath } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);

    using output = generateTmpDir();

    runTypegen({
      inputs: [contractDir, predicateDir, scriptAbiPath],
      output: output.path,
    });

    fixtureResultMap.forEach((filename, fixture) => {
      const fixtureFile = join(
        process.cwd(),
        `packages/fuel-gauge/src/abi/fixtures/${fixture}.txt`
      );
      const expected = readFileSync(fixtureFile).toString();
      const generated = readFileSync(join(output.path, filename)).toString();

      expect(generated).toEqual(expected);
    });
  });

  test('throws if no abi json file found', async () => {
    const { buildDir, name } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);
    using tmpDir = generateTmpDir(buildDir);

    rmSync(join(tmpDir.path, `${name}-abi.json`));

    await expectToThrowFuelError(
      () =>
        runTypegen({
          inputs: [tmpDir.path],
          output: tmpDir.path,
        }),
      new FuelError(FuelError.CODES.NO_ABIS_FOUND, `No abi file found in ${tmpDir.path}`)
    );
  });

  test('skips contract factory and bytecode generation when bytecode is missing and logs it', () => {
    const { buildDir, name } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    using tmpDir = generateTmpDir(buildDir);

    rmSync(join(tmpDir.path, `${name}.bin`));

    const spy = vi.spyOn(console, 'log').mockImplementationOnce(() => {});

    runTypegen({
      inputs: [tmpDir.path],
      output: tmpDir.path,
    });

    expect(spy).toHaveBeenCalledWith(
      `No bytecode found for contract at ${tmpDir.path}, will not generate ContractFactory for it.`
    );

    const contractsOutputs = readdirSync(join(tmpDir.path, 'contracts'));

    expect(contractsOutputs).toContain('index.ts');
    expect(contractsOutputs).toContain('AbiContract.ts');
    expect(contractsOutputs).toContain('AbiContractTypes.ts');
    expect(contractsOutputs).toContain('AbiContract-abi.ts');
    expect(contractsOutputs).toContain('AbiContract-storage-slots.ts');
    expect(contractsOutputs).not.toContain('AbiContractFactory.ts');
    expect(contractsOutputs).not.toContain('AbiContract-bytecode.ts');
  });

  test('throws when missing bytecode for script', async () => {
    const { buildDir, name } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);
    using tmpDir = generateTmpDir(buildDir);

    rmSync(join(tmpDir.path, `${name}.bin`));

    await expectToThrowFuelError(
      () =>
        runTypegen({
          inputs: [tmpDir.path],
          output: tmpDir.path,
        }),
      new FuelError(
        FuelError.CODES.BIN_FILE_NOT_FOUND,
        `For scripts, the bytecode is required. No bytecode found for script at ${tmpDir.path}.`
      )
    );
  });

  test('throws when missing bytecode for predicate', async () => {
    const { buildDir, name } = getAbiForcProject(AbiProjectsEnum.ABI_PREDICATE);
    using tmpDir = generateTmpDir(buildDir);

    rmSync(join(tmpDir.path, `${name}.bin`));

    await expectToThrowFuelError(
      () =>
        runTypegen({
          inputs: [tmpDir.path],
          output: tmpDir.path,
        }),
      new FuelError(
        FuelError.CODES.BIN_FILE_NOT_FOUND,
        `For predicates, the bytecode is required. No bytecode found for predicate at ${tmpDir.path}.`
      )
    );
  });
});
