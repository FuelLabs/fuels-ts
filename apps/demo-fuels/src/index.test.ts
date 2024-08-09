/**
 * NOTE: These tests are a copy of the ones at:
 *  - /apps/demo-typegen/src/demo.test.ts
 *
 * It ensures that built code is fully working.
 */

import { toHex, Wallet } from 'fuels';
import { launchTestNode, safeExec } from 'fuels/test-utils';

import { SampleFactory, Sample } from './sway-programs-api';

/**
 * @group node
 * @group browser
 */
describe('ExampleContract', () => {
  it('should return the input', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // Deploy
    const deploy = await SampleFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();
    const { value } = await waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = new Sample(contract.id, wallet);
    const call2 = await contractInstance.functions.return_input(1337).call();
    const { value: v2 } = await call2.waitForResult();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('should deploy contract', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // Deploy
    const deploy = await SampleFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();
    const { value } = await waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });

  it('should throw when simulating via contract factory with wallet with no resources', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });

    const deploy = await SampleFactory.deploy(fundedWallet);
    const { contract } = await deploy.waitForResult();

    const contractInstance = new Sample(contract.id, unfundedWallet);

    const { error } = await safeExec(() =>
      contractInstance.functions.return_input(1337).simulate()
    );

    expect((<Error>error).message).toMatch('not enough coins to fit the target');
  });

  it('should not throw when dry running via contract factory with wallet with no resources', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });

    const { waitForResult } = await SampleFactory.deploy(fundedWallet);
    const { contract } = await waitForResult();
    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demo how to use generated files just fine', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const deploy = await SampleFactory.deploy(wallet);
    const { contract: deployed } = await deploy.waitForResult();

    const contractsIds = {
      sample: deployed.id,
    };

    // #region using-generated-files
    // #context import { Sample } from './sway-programs-api';
    // #context import contractsIds from './sway-programs-api/contract-ids.json';

    // #context /**
    // #context   * Get IDs using:
    // #context   *   contractsIds.<my-contract-name>
    // #context   */

    // #context const wallet = new Wallet.fromPrivateKey(process.env.PRIVATE_KEY);
    const contract = new Sample(contractsIds.sample, wallet);

    const { value } = await contract.functions.return_input(1337).dryRun();

    expect(value.toHex()).toEqual(toHex(1337));
    // #endregion using-generated-files
  });
});
