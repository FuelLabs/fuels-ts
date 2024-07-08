// #region Testing-in-ts-ts
import { ContractFactory, Provider, toHex, Wallet, FUEL_NETWORK_URL, Address } from 'fuels';
import { generateTestWallet , safeExec } from 'fuels/test-utils';

import storageSlots from '../contract/out/release/demo-contract-storage_slots.json';

import { DemoContractAbi__factory } from './contract-types';
import bytecode from './contract-types/DemoContractAbi.hex';
import type { PredicateAbiInputs } from './predicate-types';
import { PredicateAbi__factory } from './predicate-types';
import { ScriptAbi__factory } from './script-types';

let baseAssetId: string;

/**
 * @group node
 */
describe('ExampleContract', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });
  it('with imported storage slots', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    // #region typegen-demo-contract-storage-slots
    // #context import storageSlots from './contract/out/debug/demo-contract-storage_slots.json';

    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet, {
      storageSlots,
    });
    // #endregion typegen-demo-contract-storage-slots

    expect(contract.id).toBeTruthy();
  });
  it('should return the input', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    // Deploy
    const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract();
    const contractId = contract.id;

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    // #region typegen-demo-contract-factory-connect
    // #context import { DemoContractAbi__factory } from './types';

    const contractInstance = DemoContractAbi__factory.connect(contractId, wallet);
    const { value: v2 } = await contractInstance.functions.return_input(1337).call();
    // #endregion typegen-demo-contract-factory-connect
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    // #region typegen-demo-contract-factory-deploy
    // #context import { DemoContractAbi__factory } from './types';
    // #context import bytecode from './types/DemoContractAbi.hex';

    // Deploy
    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet);

    // #endregion typegen-demo-contract-factory-deploy

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});
// #endregion Testing-in-ts-ts

it('should throw when simulating via contract factory with wallet with no resources', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract();
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).simulate());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

it('should not throw when dry running via contract factory with wallet with no resources', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const fundedWallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract();
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
});

test('Example script', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

  // #region typegen-demo-script
  // #context import { ScriptAbi__factory } from './types';

  const script = ScriptAbi__factory.createInstance(wallet);
  const { value } = await script.functions.main().call();
  // #endregion typegen-demo-script
  expect(value).toStrictEqual(10);
});

test('Example predicate', async () => {
  // #region typegen-demo-predicate
  // #context import type { PredicateAbiInputs } from './types';
  // #context import { PredicateAbi__factory } from './types';

  // In this exchange, we are first transferring some coins to the predicate
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom(), provider);

  const predicateData: PredicateAbiInputs = [];
  const predicate = PredicateAbi__factory.createInstance(provider, predicateData);

  const tx = await wallet.transfer(predicate.address, 150_000, baseAssetId);
  const { isStatusSuccess } = await tx.wait();

  // Then we are transferring some coins from the predicate to a random address (receiver)
  const tx2 = await predicate.transfer(receiver.address, 50_000, baseAssetId);
  await tx2.wait();

  expect((await receiver.getBalance()).toNumber()).toEqual(50_000);
  expect(isStatusSuccess).toBeTruthy();
  // #endregion typegen-demo-predicate
});
