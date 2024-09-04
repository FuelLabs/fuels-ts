import type { AbiSpecification } from '@fuel-ts/abi';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AbiParser } from '@fuel-ts/abi';
import { log } from 'console';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

/**
 * @group node
 * @group browser
 */
describe('AbiParser', () => {
  test('contract', () => {
    const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    const abi = AbiParser.parse(abiContents as AbiSpecification);
    log(abi);
  });
});
