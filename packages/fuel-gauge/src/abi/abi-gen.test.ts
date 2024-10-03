import { AbiGen, getProgramDetails } from '@fuel-ts/abi';
import { readFileSync } from 'fs';
import { join } from 'path';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

/**
 * @group node
 */
describe('AbiGen', () => {
  test('contract', () => {
    const fixtureResultMap = new Map([
      ['common', 'common.ts'],
      ['contract', 'AbiContract.ts'],
      ['contract-types', 'AbiContractTypes.ts'],
      ['contract-factory', 'AbiContractFactory.ts'],
      ['contract-bytecode', 'AbiContract-bytecode.ts'],
      ['contract-abi', 'AbiContract-abi.json'],
      ['contract-storage-slots', 'AbiContract-storage-slots.json'],
      ['predicate', 'AbiPredicate.ts'],
      ['predicate-types', 'AbiPredicateTypes.ts'],
      ['predicate-abi', 'AbiPredicate-abi.json'],
      ['script', 'AbiScript.ts'],
      ['script-types', 'AbiScriptTypes.ts'],
      ['script-abi', 'AbiScript-abi.json'],
      ['index', 'index.ts'],
    ]);

    const { buildDir: contractDir } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    const { buildDir: predicateDir } = getAbiForcProject(AbiProjectsEnum.ABI_PREDICATE);
    const { buildDir: scriptDir } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);

    const programDetails = getProgramDetails([contractDir, predicateDir, scriptDir]);
    const { results } = new AbiGen({ programDetails });

    fixtureResultMap.forEach((filename, fixture) => {
      const fixtureFile = join(
        process.cwd(),
        `packages/fuel-gauge/src/abi/fixtures/${fixture}.txt`
      );
      const fixtureContent = readFileSync(fixtureFile).toString();

      const result = results.find((r) => r.filename === filename);
      expect(result?.content).toEqual(fixtureContent);
    });
  });
});
