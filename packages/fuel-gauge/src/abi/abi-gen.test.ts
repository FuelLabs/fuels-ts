import { AbiGen, getProgramDetails } from '@fuel-ts/abi';
import { readFileSync } from 'fs';
import { join } from 'path';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

/**
 * @group node
 */
describe('AbiGen', () => {
  test('AbiGen generates all files correctly', () => {
    const fixtureResultMap = new Map([
      ['index', 'index.ts'],
      ['common', 'common.ts'],

      ['contract', 'contracts/AbiContract.ts'],
      ['contract-types', 'contracts/AbiContractTypes.ts'],
      ['contract-factory', 'contracts/AbiContractFactory.ts'],
      ['contract-bytecode', 'contracts/AbiContract-bytecode.ts'],
      ['contract-abi', 'contracts/AbiContract-abi.json'],
      ['contract-storage-slots', 'contracts/AbiContract-storage-slots.json'],

      ['predicate', 'predicates/AbiPredicate.ts'],
      ['predicate-types', 'predicates/AbiPredicateTypes.ts'],
      ['predicate-abi', 'predicates/AbiPredicate-abi.json'],
      ['script', 'scripts/AbiScript.ts'],

      ['script-types', 'scripts/AbiScriptTypes.ts'],
      ['script-abi', 'scripts/AbiScript-abi.json'],
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
});