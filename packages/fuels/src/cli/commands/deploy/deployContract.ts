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

  const proxyAbi = Src14OwnedProxy.abi;
  const proxyFactory = new Src14OwnedProxyFactory(wallet);

  const isProxy = tomlContents?.proxy?.enabled;
  const proxyAddress = tomlContents?.proxy?.address;

  if (isProxy) {
    if (proxyAddress) {
      /**
       * If the proxy address is already set, we need to deploy the target contract
       * and update the address at the proxy address with the new target contract ID.
       */

      // Deploy the target contract
      const targetContractFactory = new ContractFactory(targetBytecode, targetAbi, wallet);
      const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
      const { contract: targetContract } = await waitForTarget();

      // Update the contract at the proxy address with the new target contract ID
      const proxyContract = new Contract(proxyAddress, proxyAbi, wallet);
      const { waitForResult: waitForProxyUpdate } = await proxyContract.functions
        .set_proxy_target({ bits: targetContract.id.toB256() })
        .call();

      await waitForProxyUpdate();

      return proxyAddress;
    }

    /**
     * If the proxy address is not set, we need to deploy the proxy and the target
     *  contract and set the proxy address in the target contracts TOML file.
     */

    // Deploy the target contract
    const targetContractFactory = new ContractFactory(targetBytecode, targetAbi, wallet);
    const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
    const { contract: targetContract } = await waitForTarget();

    // Deploy the SR-C14 Compliant / Proxy Contract
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { storageSlots, stateRoot, ...commonDeployConfig } = deployConfig;

    const proxyDeployConfig: DeployContractOptions = {
      ...commonDeployConfig,
      configurableConstants: {
        INITIAL_TARGET: { bits: targetContract.id.toB256() },
        INITIAL_OWNER: { Initialized: { Address: { bits: wallet.address.toB256() } } },
      },
    };

    const { waitForResult: waitForProxy } = await proxyFactory.deploy(proxyDeployConfig);
    const { contract: proxyContract } = await waitForProxy();

    // Initialize the proxy contract
    const { waitForResult: waitForProxyInit } = await proxyContract.functions
      .initialize_proxy()
      .call();

    await waitForProxyInit();

    const proxyContractId = proxyContract.id.toB256();

    // Write the address of the proxy contract to target TOML
    setForcTomlProxyAddress(contractPath, proxyContractId);

    return proxyContractId;
  }

  // If the contract does not have a proxy, we can deploy it as a normal contract
  const contractFactory = new ContractFactory(targetBytecode, targetAbi, wallet);
  const { waitForResult } = await contractFactory.deploy(deployConfig);
  const { contract } = await waitForResult();

  return contract.id.toB256();
}
