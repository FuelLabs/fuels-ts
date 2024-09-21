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
    if (storageSlots.length) {
      // Automatically inject `storageSlots` if it's not an empty array.
      // eslint-disable-next-line no-param-reassign
      deployConfig.storageSlots = storageSlots;
    } else {
      // Or ensure `storageSlots` is not set
      // eslint-disable-next-line no-param-reassign
      deployConfig.storageSlots = undefined;
      // eslint-disable-next-line no-param-reassign
      delete deployConfig?.storageSlots;
    }
  }

  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
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
      const targetContractFactory = new ContractFactory(bytecode, abi, wallet);
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
    const targetContractFactory = new ContractFactory(bytecode, abi, wallet);
    const { waitForResult: waitForTarget } = await targetContractFactory.deploy(deployConfig);
    const { contract: targetContract } = await waitForTarget();

    // Deploy the SR-C14 Compliant / Proxy Contract
    const proxyDeployConfig: DeployContractOptions = {
      ...deployConfig,
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
  const contractFactory = new ContractFactory(bytecode, abi, wallet);
  const { waitForResult } = await contractFactory.deploy(deployConfig);
  const { contract } = await waitForResult();

  return contract.id.toB256();
}
