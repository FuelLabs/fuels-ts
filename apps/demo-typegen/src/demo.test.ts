// #region Testing-with-jest-ts
import { safeExec } from '@fuel-ts/errors/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN } from 'fuels';
import { ContractFactory, Provider, toHex, BaseAssetId, Wallet, FUEL_NETWORK_URL } from 'fuels';

import { DemoContractAbi__factory } from './generated-types';
import bytecode from './generated-types/DemoContractAbi.hex';

let gasPrice: BN;
describe('ExampleContract', () => {
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });
  it('should return the input', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);

    // Deploy
    const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract({ gasPrice });

    // Call
    const { value } = await contract.functions
      .return_input(1337)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = DemoContractAbi__factory.connect(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions
      .return_input(1337)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[500_000, BaseAssetId]]);

    // Deploy
    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet, { gasPrice });

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
