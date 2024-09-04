import { log } from 'console';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

/**
 * @group node
 * @group browser
 */
describe('AbiGen', () => {
  test('contract', () => {
    const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    log(abiContents);
  });

  test('script', () => {
    const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);
    log(abiContents);
  });

  test('predicate', () => {
    const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_PREDICATE);
    log(abiContents);
  });
});
