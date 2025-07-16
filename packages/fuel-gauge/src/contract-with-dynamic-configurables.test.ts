import { launchTestNode } from 'fuels/test-utils';

import { ContractWithDynamicConfigurablesFactory } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Contract with dynamic configurables', () => {
  it('should accept existing dynamic configurables', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [deployer],
    } = launched;

    const contractFactory = new ContractWithDynamicConfigurablesFactory(deployer);
    const { waitForResult: waitForDeploy } = await contractFactory.deploy();
    const { contract } = await waitForDeploy();

    const { waitForResult } = await contract.functions
      .main(true, 8, 'sway', 'forc', 'fuel', 16)
      .call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('should allow setting of dynamic configurables [create tx]', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [deployer],
    } = launched;

    const contractFactory = new ContractWithDynamicConfigurablesFactory(deployer);
    const { waitForResult: waitForDeploy } = await contractFactory.deployAsCreateTx({
      configurableConstants: {
        BOOL: false,
        U8: 0,
        STR: 'STR',
        STR_2: 'STR_2',
        STR_3: 'STR_3',
        LAST_U8: 0,
      },
    });
    const { contract } = await waitForDeploy();

    const { waitForResult } = await contract.functions
      .main(false, 0, 'STR', 'STR_2', 'STR_3', 0)
      .call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('should allow setting of dynamic configurables [blob tx]', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [deployer],
    } = launched;

    const contractFactory = new ContractWithDynamicConfigurablesFactory(deployer);
    const { waitForResult: waitForDeploy } = await contractFactory.deployAsBlobTx({
      configurableConstants: {
        BOOL: false,
        U8: 0,
        STR: 'STR',
        STR_2: 'STR_2',
        STR_3: 'STR_3',
        LAST_U8: 0,
      },
    });
    const { contract } = await waitForDeploy();

    const { waitForResult } = await contract.functions
      .main(false, 0, 'STR', 'STR_2', 'STR_3', 0)
      .call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('should return false for contract with incorrect data', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [deployer],
    } = launched;

    const contractFactory = new ContractWithDynamicConfigurablesFactory(deployer);
    const { waitForResult: waitForDeploy } = await contractFactory.deploy();
    const { contract } = await waitForDeploy();

    const { waitForResult } = await contract.functions
      .main(true, 8, 'sway', 'forc', 'fuel-incorrect', 16)
      .call();

    const { value } = await waitForResult();

    expect(value).toBe(false);
  });
});
