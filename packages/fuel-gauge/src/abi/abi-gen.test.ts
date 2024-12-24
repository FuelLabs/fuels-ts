import { cpSync, mkdirSync, readFileSync, rmdirSync, rmSync } from 'fs';
import { AbiGen, randomUUID } from 'fuels';
import { getProgramDetails } from 'fuels/cli-utils';
import { join } from 'path';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

function getUniqueBuildOutputs(buildOutputsPath: string) {
  const uniquePath = join(buildOutputsPath, '../', randomUUID());

  mkdirSync(uniquePath, { recursive: true });

  cpSync(buildOutputsPath, uniquePath, { recursive: true });

  return {
    path: uniquePath,
    [Symbol.dispose]: () => {
      rmdirSync(uniquePath, { recursive: true });
    },
  };
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
    const { buildDir: scriptDir } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);

    const programDetails = getProgramDetails([contractDir, predicateDir, scriptDir]);
    const results = AbiGen.generate({
      programDetails,
      versions: { FUELS: '0.94.8', FORC: '0.64.0' },
    });

    fixtureResultMap.forEach((filename, fixture) => {
      const fixtureFile = join(
        process.cwd(),
        `packages/fuel-gauge/src/abi/fixtures/${fixture}.txt`
      );
      const fixtureContent = readFileSync(fixtureFile).toString();
      const result = results.find((r) => r.filename === filename);
      expect(result?.content).toEqual(fixtureContent);

      // verify only one file generated
      expect(results.filter((r) => r.filename === filename)).toHaveLength(1);
    });
  });

  test('skips contract factory and bytecode generation when bytecode is missing', () => {
    const { buildDir, name } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    using customBuildOutputs = getUniqueBuildOutputs(buildDir);

    rmSync(join(customBuildOutputs.path, `${name}.bin`));
    const programDetails = getProgramDetails([customBuildOutputs.path]);

    const results = AbiGen.generate({
      programDetails,
      versions: { FUELS: '0.94.8', FORC: '0.64.0' },
    });

    expect(results.map((r) => r.filename)).not.toContain(/AbiContractFactory.ts/);
    expect(results.map((r) => r.filename)).not.toContain(/AbiContract-bytecode.ts/);
  });
});
