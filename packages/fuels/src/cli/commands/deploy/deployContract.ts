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

  if (existsSync(storageSlotsPath)) {
    const storageSlots = JSON.parse(readFileSync(storageSlotsPath, 'utf-8'));
    // eslint-disable-next-line no-param-reassign
    deployConfig.storageSlots = storageSlots;
  }

  const targetBytecode = readFileSync(binaryPath);
  const targetAbi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const targetStorageSlots = deployConfig.storageSlots;

  const proxyBytecode = Src14OwnedProxyFactory.bytecode;
  const proxyAbi = Src14OwnedProxy.abi;
  const proxyStorageSlots = Src14OwnedProxy.storageSlots;

  const isProxyEnabled = tomlContents?.proxy?.enabled;
  const proxyAddress = tomlContents?.proxy?.address;

  /**
   * 0. If contract does NOT require a proxy.
   * Deploy as normal contract
   */
  if (!isProxyEnabled) {
    // a. Deploy the target contract
    const contractFactory = new ContractFactory(targetBytecode, targetAbi, wallet);
    const { waitForResult } = await contractFactory.deploy(deployConfig);
    const { contract } = await waitForResult();
    return contract.id.toB256();
  }

  /**
   * 1. If contract DOES require a proxy and HAS the `address` property set in their `Forc.Toml` file.
   * We need to re-deploy the target contract and update its ID in the proxy contract.
   */
  if (proxyAddress) {
    // a. Deploy the target contract
    const targetContractFactory = new ContractFactory(targetBytecode, targetAbi, wallet);
    const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
    const { contract: targetContract } = await waitForTarget();

    // b. Update proxy contract with the new target contract ID
    const proxyContract = new Contract(proxyAddress, proxyAbi, wallet);
    const { waitForResult: waitForProxyUpdate } = await proxyContract.functions
      .set_proxy_target({ bits: targetContract.id.toB256() })
      .call();

    await waitForProxyUpdate();

    return proxyAddress;
  }

  /**
   * 2. If contract DOES require proxy and the address is NOT set.
   * We need to deploy the proxy and the target contracts, and update the
   * [proxy].address property in the users' Forc.Toml file.
   */

  // a. Deploy the target contract
  const targetContractFactory = new ContractFactory(targetBytecode, targetAbi, wallet);
  const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
  const { contract: targetContract } = await waitForTarget();

  // b. Deploy the SR-C14 Compliant / Proxy Contract
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { storageSlots, stateRoot, ...commonDeployConfig } = deployConfig;
  const mergedStorageSlots = [...(targetStorageSlots || []), ...(proxyStorageSlots || [])];

  const proxyDeployConfig: DeployContractOptions = {
    ...commonDeployConfig,
    storageSlots: mergedStorageSlots,
    configurableConstants: {
      INITIAL_TARGET: { bits: targetContract.id.toB256() },
      INITIAL_OWNER: { Initialized: { Address: { bits: wallet.address.toB256() } } },
    },
  };

  const proxyFactory = new ContractFactory(proxyBytecode, proxyAbi, wallet);
  const { waitForResult: waitForProxy } = await proxyFactory.deploy(proxyDeployConfig);
  const { contract: proxyContract } = await waitForProxy();

  // c. Initialize the proxy contract
  const { waitForResult: waitForProxyInit } = await proxyContract.functions
    .initialize_proxy()
    .call();

  await waitForProxyInit();

  const proxyContractId = proxyContract.id.toB256();

  // d. Write the address of the proxy contract to user's Forc.Toml file
  setForcTomlProxyAddress(contractPath, proxyContractId);

  return proxyContractId;
}
