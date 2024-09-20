import type { WalletUnlocked } from '@fuel-ts/account';
import { ContractFactory } from '@fuel-ts/contract';
import type { DeployContractOptions } from '@fuel-ts/contract';
import { Contract } from '@fuel-ts/program';
import { existsSync, readFileSync } from 'fs';

import { setForcTomlProxyAddress, type ForcToml } from '../../config/forcUtils';
import { debug } from '../../utils/logger';

import { Src14OwnedProxy, Src14OwnedProxyFactory } from './proxy/types';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  storageSlotsPath: string,
  deployConfig: DeployContractOptions,
  contractPath: string,
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

  if (isProxy) {
    if (proxyAddress) {
      // If the proxy address is already set, we need to deploy the proxied contract and update the address
      // at the proxy address with the new proxied contract ID

      // Deploy the proxied contract
      const targetContractFactory = new ContractFactory(bytecode, abi, wallet);
      const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
      const { contract: targetContract } = await waitForTarget();

      // Update the contract at the proxy address with the new proxied contract ID
      const proxyContract = new Contract(proxyAddress, proxyAbi, wallet);
      const { waitForResult: waitForProxyUpdate } = await proxyContract.functions
        .set_proxy_target({ bits: targetContract.id.toB256() })
        .call();
      await waitForProxyUpdate();

      return proxyContract.id.toB256();
    }
    // If the proxy address is not set, we need to deploy the proxy and the proxied contract and
    // set the proxy address in the proxied contracts TOML file

    // Deploy the proxied contract
    const targetContractFactory = new ContractFactory(bytecode, abi, wallet);
    const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
    const { contract: targetContract } = await waitForTarget();

    const proxyDeployConfig: DeployContractOptions = {
      // Todo: fix the config for undefined
      // salt: deployConfig.salt,
      // stateRoot: deployConfig.stateRoot,
      configurableConstants: {
        INITIAL_TARGET: { bits: targetContract.id.toB256() },
        INITIAL_OWNER: { Initialized: { Address: { bits: wallet.address.toB256() } } },
      },
    };

    // Deploy the SRC14 Compliant Proxy Contract
    const { waitForResult: waitForProxy } = await proxyFactory.deploy(proxyDeployConfig);
    const { contract: proxyContract } = await waitForProxy();

    // Initialize the proxy contract
    const { waitForResult: waitForProxyInit } = await proxyContract.functions
      .initialize_proxy()
      .call();
    await waitForProxyInit();

    // Write the address of the proxy contract to proxied TOML
    setForcTomlProxyAddress(contractPath, proxyContract.id.toB256());

    return proxyContract.id.toB256();
  }
  // If the contract does not have a proxy, we can deploy it as a normal contract
  const contractFactory = new ContractFactory(bytecode, abi, wallet);

  const { waitForResult } = await contractFactory.deploy(deployConfig);
  const { contract } = await waitForResult();

  return contract.id.toB256();
}
