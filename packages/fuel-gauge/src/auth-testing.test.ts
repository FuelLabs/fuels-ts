import { getRandomB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { AuthTestingContractAbi__factory } from '../test/typegen/contracts';
import AuthTestingAbiHex from '../test/typegen/contracts/AuthTestingContractAbi.hex';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Auth Testing', () => {
  it('can get is_caller_external', async () => {
    using contractInstance = await launchTestContract({
      deployer: AuthTestingContractAbi__factory,
      bytecode: AuthTestingAbiHex,
    });

    const { waitForResult } = await contractInstance.functions.is_caller_external().call();
    const { value } = await waitForResult();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with correct id]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        { deployer: AuthTestingContractAbi__factory, bytecode: AuthTestingAbiHex },
      ],
    });

    const {
      contracts: [contractInstance],
      wallets: [wallet],
    } = launched;

    const { waitForResult } = await contractInstance.functions
      .check_msg_sender({ bits: wallet.address.toB256() })
      .call();

    const { value } = await waitForResult();

    expect(value).toBeTruthy();
  });

  it('can check_msg_sender [with incorrect id]', async () => {
    using contractInstance = await launchTestContract({
      deployer: AuthTestingContractAbi__factory,
      bytecode: AuthTestingAbiHex,
    });

    await expect(
      contractInstance.functions.check_msg_sender({ bits: getRandomB256() }).call()
    ).rejects.toThrow(
      'The transaction reverted because an "assert" statement failed to evaluate to true.'
    );
  });
});
