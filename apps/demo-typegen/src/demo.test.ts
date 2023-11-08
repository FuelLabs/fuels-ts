// #region Testing-in-ts-ts
import { safeExec } from '@fuel-ts/errors/test-utils';
import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { ContractFactory, toHex, Wallet } from 'fuels';

import { DemoContractAbi__factory } from './generated-types';
import bytecode from './generated-types/DemoContractAbi.hex';

/**
 * @group node
 */
describe('ExampleContract', () => {
  it('should return the input', async () => {
    await using launched = await TestNodeLauncher.launch({});
    const {
      wallets: [wallet],
      provider,
    } = launched;
    const gasPrice = provider.getGasConfig().minGasPrice;

    // Deploy
    const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract({ gasPrice });

    // Call
    const { value } = await contract.functions.return_input(1337).txParams({ gasPrice }).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = DemoContractAbi__factory.connect(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions
      .return_input(1337)
      .txParams({ gasPrice })
      .call();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    await using launched = await TestNodeLauncher.launch({});
    const {
      wallets: [wallet],
      provider,
    } = launched;
    const gasPrice = provider.getGasConfig().minGasPrice;

    // Deploy
    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet, { gasPrice });

    // Call
    const { value } = await contract.functions.return_input(1337).txParams({ gasPrice }).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});
// #endregion Testing-in-ts-ts

it('should throw when simulating via contract factory with wallet with no resources', async () => {
  await using launched = await TestNodeLauncher.launch({});
  const {
    wallets: [fundedWallet],
    provider,
  } = launched;
  const gasPrice = provider.getGasConfig().minGasPrice;

  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract({ gasPrice });
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).simulate());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

it('should throw when dry running via contract factory with wallet with no resources', async () => {
  await using launched = await TestNodeLauncher.launch({});
  const {
    wallets: [fundedWallet],
    provider,
  } = launched;
  const gasPrice = provider.getGasConfig().minGasPrice;
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, fundedWallet);
  const contract = await factory.deployContract({ gasPrice });
  const contractInstance = DemoContractAbi__factory.connect(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).dryRun());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});
