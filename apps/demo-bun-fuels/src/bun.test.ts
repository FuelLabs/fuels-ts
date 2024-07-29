/**
 * NOTE: These tests are a copy of the ones at:
 *  - /apps/demo-typegen/src/demo.test.ts
 *
 * It ensures that built code is fully working.
 */

import { ContractFactory, toHex, Wallet } from 'fuels';
import { launchTestNode, safeExec } from 'fuels/test-utils';

import { SampleAbi__factory } from './sway-programs-api';
import bytecode from './sway-programs-api/contracts/SampleAbi.hex';

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
    const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, wallet);
    const { waitForResult } = await factory.deployContract();
    const { contract } = await waitForResult();

    // Call
    const call1 = await contract.functions.return_input(1337).call();

    // Wait for result
    const { value } = await call1.waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = SampleAbi__factory.connect(contract.id, wallet);
    const call2 = await contractInstance.functions.return_input(1337).call();

    // Wait for result
    const { value: v2 } = await call2.waitForResult();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // Deploy
    const deploy = await SampleAbi__factory.deployContract(bytecode, wallet);
    const { contract } = await deploy.waitForResult();

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();

    // Wait for result
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

    const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, fundedWallet);
    const { waitForResult } = await factory.deployContract();
    const { contract } = await waitForResult();
    const contractInstance = SampleAbi__factory.connect(contract.id, unfundedWallet);

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

    const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, fundedWallet);
    const { waitForResult } = await factory.deployContract();
    const { contract } = await waitForResult();
    const contractInstance = SampleAbi__factory.connect(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demo how to use generated files just fine', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const { waitForResult } = await SampleAbi__factory.deployContract(bytecode, wallet);
    const { contract: depoloyed } = await waitForResult();
    const contractsIds = {
      sample: depoloyed.id,
    };

    const contract = SampleAbi__factory.connect(contractsIds.sample, wallet);

    const { value } = await contract.functions.return_input(1337).dryRun();

    expect(value.toHex()).toEqual(toHex(1337));
  });
});
