// #region Testing-with-jest-ts
import { safeExec } from '@fuel-ts/errors/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { ContractFactory, Provider, toHex, BaseAssetId, Wallet } from 'fuels';

import storageSlots from '../contract/out/debug/demo-contract-storage_slots.json';

import { DemoContractAbi__factory } from './generated-types';
import bytecode from './generated-types/DemoContractAbi.hex';

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    // Deploy
    const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract();

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = DemoContractAbi__factory.connect(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions.return_input(1337).call();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    // Deploy
    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet, {
      storageSlots,
    });

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});
// #endregion Testing-with-jest-ts

it('should throw when simulating via contract factory with wallet with no resources', async () => {
  const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
  const fundedWallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract();
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).simulate());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

it('should throw when dry running via contract factory with wallet with no resources', async () => {
  const provider = await Provider.connect('http://127.0.0.1:4000/graphql');
  const fundedWallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract();
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).dryRun());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});
