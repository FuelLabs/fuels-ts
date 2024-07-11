import { launchTestNode } from 'fuels/test-utils';

import type { AdvancedLoggingAbi, CallTestContractAbi } from '../test/typegen';
import { AdvancedLoggingAbi__factory, CallTestContractAbi__factory } from '../test/typegen';
import AdvancedLoggingBytecode from '../test/typegen/contracts/AdvancedLoggingAbi.hex';
import CallTestContractBytecode from '../test/typegen/contracts/CallTestContractAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('type level tests for launchTestNode', () => {
  test('infers types correctly', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingBytecode },
        { deployer: CallTestContractAbi__factory, bytecode: CallTestContractBytecode },
        { deployer: AdvancedLoggingAbi__factory, bytecode: AdvancedLoggingBytecode },
      ],
    });
    const {
      contracts: [c1, c2, c3],
    } = launched;

    expectTypeOf(c1).toMatchTypeOf<AdvancedLoggingAbi>();
    expectTypeOf(c2).toMatchTypeOf<CallTestContractAbi>();
    expectTypeOf(c3).toMatchTypeOf<AdvancedLoggingAbi>();
  });
});
