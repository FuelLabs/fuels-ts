import type { WalletUnlocked } from '@fuel-ts/account';
import { ContractFactory } from '@fuel-ts/contract';
import type { DeployContractOptions } from '@fuel-ts/contract';
import { Contract } from '@fuel-ts/program';
import { existsSync, readFileSync } from 'fs';

import type { ForcToml } from '../../config/forcUtils';
import { debug } from '../../utils/logger';

import { Src14OwnedProxy, Src14OwnedProxyFactory } from './proxy';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  storageSlotsPath: string,
  deployConfig: DeployContractOptions,
  tomlContents: ForcToml
) {
  debug(`Deploying contract for ABI: ${abiPath}`);

  const bytecode = readFileSync(binaryPath);

  if (existsSync(storageSlotsPath)) {
    const storageSlots = JSON.parse(readFileSync(storageSlotsPath, 'utf-8'));
    // eslint-disable-next-line no-param-reassign
    deployConfig.storageSlots = storageSlots;
  }

  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const proxyAbi = Src14OwnedProxy.abi;
  const proxyFactory = new Src14OwnedProxyFactory(wallet);

  const isProxy = tomlContents?.proxy?.enabled;
  const proxyAddress = tomlContents?.proxy?.address;

  const deployedContractIds: string[] = [];

  if (isProxy) {
    if (proxyAddress) {
      // If the proxy address is already set, we need to deploy the proxied contract and update the address
      // at the proxy address with the new proxied contract ID

      // Deploy the proxied contract
      const proxiedContractFactory = new ContractFactory(bytecode, abi, wallet);
      const { waitForResult: waitForProxied } = await proxiedContractFactory.deploy(deployConfig);
      const { contract: proxiedContract } = await waitForProxied();

      // Update the contract at the proxy address with the new proxied contract ID
      const proxyContract = new Contract(proxyAddress, proxyAbi, wallet);
      const { waitForResult: waitForProxyUpdate } = await proxyContract.functions
        .set_proxy_target({ bits: proxiedContract.id.toB256() })
        .call();
      await waitForProxyUpdate();

      // Return the proxied contract ID
      deployedContractIds.push(proxiedContract.id.toB256());
    } else {
      // If the proxy address is not set, we need to deploy the proxy and the proxied contract and
      // set the proxy address in the proxied contracts TOML file

      // Deploy the proxied contract
      const proxiedContractFactory = new ContractFactory(bytecode, abi, wallet);
      const { waitForResult: waitForProxied } = await proxiedContractFactory.deploy(deployConfig);
      const { contract: proxiedContract } = await waitForProxied();

      // Deploy the SRC14 Compliant Proxy Contract
      const { waitForResult: waitForProxy } = await proxyFactory.deploy({
        ...deployConfig,
        configurableConstants: {
          INITIAL_TARGET: { bits: proxiedContract.id.toB256() },
          INITIAL_OWNER: { Initialized: { Address: { bits: wallet.address.toB256() } } },
        },
      });

      // Initialize the proxy contract
      const { contract: proxyContract } = await waitForProxy();
      const { waitForResult: waitForProxyInit } = await proxyContract.functions
        .initialize_proxy()
        .call();
      await waitForProxyInit();

      // Write the address of the proxy contract to proxied TOML
      // TODO: Toml.write({ address: proxyContract.id.toB256() })

      // Return both contract IDs
      deployedContractIds.push(proxyContract.id.toB256());
      deployedContractIds.push(proxiedContract.id.toB256());
    }
  } else {
    // If the contract does not have a proxy, we can deploy it as a normal contract

    const contractFactory = new ContractFactory(bytecode, abi, wallet);

    const { waitForResult } = await contractFactory.deploy(deployConfig);
    const { contract } = await waitForResult();

    deployedContractIds.push(contract.id.toB256());
  }

  return deployedContractIds;
}
