/**
 * NOTE: These tests are a copy of the ones at:
 *  - /apps/demo-typegen/src/demo.test.ts
 *
 * It ensures that built code is fully working.
 */

import { Provider, toHex, Wallet, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet, safeExec } from 'fuels/test-utils';

import { Sample, SampleFactory } from './sway-programs-api';

let baseAssetId: string;

/**
 * @group node
 */
describe('ExampleContract', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });

  it('should return the input', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    // Deploy
    const factory = new SampleFactory(wallet);
    const { waitForResult } = await factory.deploy();
    const { contract } = await waitForResult();

    // Call
    const call1 = await contract.functions.return_input(1337).call();

    // Wait for result
    const { value } = await call1.waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = new Sample(contract.id, wallet);
    const call2 = await contractInstance.functions.return_input(1337).call();

    // Wait for result
    const { value: v2 } = await call2.waitForResult();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deploy method', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    // Deploy
    const deploy = await SampleFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();

    // Wait for result
    const { value } = await waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });

  it('should throw when simulating via contract factory with wallet with no resources', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
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
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const unfundedWallet = Wallet.generate({ provider });

    const deploy = await SampleFactory.deploy(fundedWallet);
    const { contract } = await deploy.waitForResult();

    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demo how to use generated files just fine', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const { waitForResult } = await SampleFactory.deploy(wallet);
    const { contract: depoloyed } = await waitForResult();
    const contractsIds = {
      sample: depoloyed.id,
    };

    const contract = new Sample(contractsIds.sample, wallet);

    const { value } = await contract.functions.return_input(1337).dryRun();

    expect(value.toHex()).toEqual(toHex(1337));
  });
});
