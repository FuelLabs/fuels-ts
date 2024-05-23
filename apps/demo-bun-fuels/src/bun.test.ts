/**
 * NOTE: These tests are a copy of the ones at:
 *  - /apps/demo-typegen/src/index.test.ts
 *
 * It ensures that built code is fully working.
 */

import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { safeExec } from '@fuel-ts/errors/test-utils';
import { ContractFactory, Provider, toHex, Wallet, FUEL_NETWORK_URL } from 'fuels';

import { SampleAbi__factory } from './sway-programs-api';
import bytecode from './sway-programs-api/contracts/SampleAbi.hex';

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
    const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, wallet);
    const contract = await factory.deployContract();

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = SampleAbi__factory.connect(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions.return_input(1337).call();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    // Deploy
    const contract = await SampleAbi__factory.deployContract(bytecode, wallet);

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });

  it('should throw when simulating via contract factory with wallet with no resources', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const unfundedWallet = Wallet.generate({ provider });

    const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, fundedWallet);
    const contract = await factory.deployContract();
    const contractInstance = SampleAbi__factory.connect(contract.id, unfundedWallet);

    const { error } = await safeExec(() =>
      contractInstance.functions.return_input(1337).simulate()
    );

    expect((<Error>error).message).toMatch('not enough coins to fit the target');
  });

  it('should not throw when dry running via contract factory with wallet with no resources', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const unfundedWallet = Wallet.generate({ provider });

    const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, fundedWallet);
    const contract = await factory.deployContract();
    const contractInstance = SampleAbi__factory.connect(contract.id, unfundedWallet);

    await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
  });

  it('should demo how to use generated files just fine', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const depoloyed = await SampleAbi__factory.deployContract(bytecode, wallet);
    const contractsIds = {
      sample: depoloyed.id,
    };

    // #region using-generated-files
    // #context import { SampleAbi__factory } from './sway-programs-api';
    // #context import contractsIds from './sway-programs-api/contract-ids.json';

    // #context /**
    // #context   * Get IDs using:
    // #context   *   contractsIds.<my-contract-name>
    // #context   */

    // #context const wallet = new Wallet.fromPrivateKey(process.env.PRIVATE_KEY);
    const contract = SampleAbi__factory.connect(contractsIds.sample, wallet);

    const { value } = await contract.functions.return_input(1337).dryRun();

    expect(value.toHex()).toEqual(toHex(1337));
    // #endregion using-generated-files
  });
});
