/**
 * NOTE: These tests are a copy of the ones at:
 *  - /apps/demo-typegen/src/demo.test.ts
 *
 * It ensures that built code is fully working.
 */

import { Provider, toHex, Wallet, FUEL_NETWORK_URL, FuelError, ErrorCode } from 'fuels';
import { expectToThrowFuelError, generateTestWallet } from 'fuels/test-utils';

import { SampleFactory, Sample } from './sway-programs-api';

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
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

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
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const unfundedWallet = Wallet.generate({ provider });

    const deploy = await SampleFactory.deploy(fundedWallet);
    const { contract } = await deploy.waitForResult();

    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expectToThrowFuelError(
      () => contractInstance.functions.return_input(1337).simulate(),
      new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        'The transaction does not have enough funds to cover its execution.'
      )
    );
  });

  it('should not throw when dry running via contract factory with wallet with no resources', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const unfundedWallet = Wallet.generate({ provider });

    const { waitForResult } = await SampleFactory.deploy(fundedWallet);
    const { contract } = await waitForResult();
    const contractInstance = new Sample(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demo how to use generated files just fine', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const deploy = await SampleFactory.deploy(wallet);
    const { contract: depoloyed } = await deploy.waitForResult();
    const contractsIds = {
      sample: depoloyed.id,
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
