/**
 * NOTE: These testes are a copy of the ones at:
 *  - /apps/demo-typegen/src/index.test.ts
 *
 * It ensures that built code is fully working.
 */
import { safeExec } from '@fuel-ts/errors/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { ContractFactory, Provider, toHex, BaseAssetId, Wallet, FUEL_NETWORK_URL } from 'fuels';

import storageSlots from '../backend/sample/out/debug/sample-storage_slots.json';

import bytecode from './backend-api/contracts/SampleAbi.hex';
import { SampleAbi__factory } from './backend-api/contracts/factories/SampleAbi__factory';

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

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
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    // Deploy
    const contract = await SampleAbi__factory.deployContract(bytecode, wallet, {
      storageSlots,
    });

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});

it('should throw when simulating via contract factory with wallet with no resources', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const fundedWallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract();
  const contractInstance = SampleAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).simulate());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

it('should throw when dry running via contract factory with wallet with no resources', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const fundedWallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, SampleAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract();
  const contractInstance = SampleAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).dryRun());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});
