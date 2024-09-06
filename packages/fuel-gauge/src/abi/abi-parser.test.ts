import type { AbiSpecification } from '@fuel-ts/abi';
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
    log(JSON.stringify(abi.functions[0].inputs[0], null, 2));
  });
});
