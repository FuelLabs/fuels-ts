// #region Testing-with-jest-ts
import { safeExec } from '@fuel-ts/errors/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN } from 'fuels';
import {
  ContractFactory,
  Provider,
  toHex,
  BaseAssetId,
  Wallet,
  FUEL_NETWORK_URL,
  Address,
} from 'fuels';

import storageSlots from '../contract/out/debug/demo-contract-storage_slots.json';

import { DemoContractAbi__factory } from './contract-types';
import bytecode from './contract-types/DemoContractAbi.hex';
import { PredicateAbi__factory } from './predicate-types';
import { ScriptAbi__factory } from './script-types';

let gasPrice: BN;
describe('ExampleContract', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });
  it('with imported storage slots', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);

    // #region typegen-demo-contract-storage-slots
    // #context import storageSlots from './contract/out/debug/demo-contract-storage_slots.json';

    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet, {
      storageSlots,
      gasPrice,
    });
    // #endregion typegen-demo-contract-storage-slots

    expect(contract.id).toBeTruthy();
  });
  it('should return the input', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);

    // Deploy
    const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract({ gasPrice });
    const contractId = contract.id;

    // Call
    const { value } = await contract.functions
      .return_input(1337)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    // #region typegen-demo-contract-factory-connect
    // #context import { DemoContractAbi__factory } from './types';

    const contractInstance = DemoContractAbi__factory.connect(contractId, wallet);
    const { value: v2 } = await contractInstance.functions
      .return_input(1337)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();
    // #endregion typegen-demo-contract-factory-connect
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);

    // #region typegen-demo-contract-factory-deploy
    // #context import { DemoContractAbi__factory } from './types';
    // #context import bytecode from './types/DemoContractAbi.hex';

    // Deploy
    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet, { gasPrice });
    // #endregion typegen-demo-contract-factory-deploy

    // Call
    const { value } = await contract.functions
      .return_input(1337)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});
// #endregion Testing-with-jest-ts

it('should throw when simulating via contract factory with wallet with no resources', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const fundedWallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract({ gasPrice });
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() =>
    contractInstance.functions.return_input(1337).txParams({ gasLimit: 10_000 }).simulate()
  );

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

it('should throw when dry running via contract factory with wallet with no resources', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const fundedWallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract({ gasPrice });
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() =>
    contractInstance.functions.return_input(1337).txParams({ gasLimit: 10_000 }).dryRun()
  );

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

test('Example script', async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);

  // TODO: investigate why do we need to specify the gasLimit here. If we don't specify it, the call fails saying `FuelError: Gas limit '0' is lower than the required: '19'.`

  // #region typegen-demo-script
  // #context import { ScriptAbi__factory } from './types';

  const script = ScriptAbi__factory.createInstance(wallet);
  const { value } = await script.functions
    .main()
    .txParams({
      gasPrice: provider.getGasConfig().minGasPrice,
      gasLimit: 10_000,
    })
    .call();
  // #endregion typegen-demo-script
  // @ts-expect-error TODO: investitage - typegen is expecting value to be a number but the value being returned is the string '0xa'
  expect(value.toNumber()).toBe(10);
});

test('Example predicate', async () => {
  // #region typegen-demo-predicate
  // #context import { PredicateAbi__factory } from './types';

  // In this exchange, we are first transferring some coins to the predicate
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom(), provider);

  const predicate = PredicateAbi__factory.createInstance(provider);

  const tx = await wallet.transfer(predicate.address, 100_000, BaseAssetId, {
    gasPrice: provider.getGasConfig().minGasPrice,
    gasLimit: 50,
  });
  await tx.wait();

  const initialPredicateBalance = await predicate.getBalance();

  // Then we are transferring some coins from the predicate to a random address (receiver)
  const tx2 = await predicate.transfer(receiver.address, 50_000, BaseAssetId, {
    gasPrice: provider.getGasConfig().minGasPrice,
    gasLimit: 50,
  });
  await tx2.wait();

  expect((await receiver.getBalance()).toNumber()).toEqual(50_000);
  expect((await predicate.getBalance()).toNumber()).toBeLessThan(
    initialPredicateBalance.toNumber()
  );
  // #endregion typegen-demo-predicate
});
