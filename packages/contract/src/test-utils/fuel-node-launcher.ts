import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { Contract } from '@fuel-ts/program';
import type { Provider, ProviderOptions } from '@fuel-ts/providers';
import type { LaunchNodeOptions } from '@fuel-ts/utils/test-utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import type { WalletConfig } from '@fuel-ts/wallet/test-utils';
import { launchCustomProviderAndGetWallets } from '@fuel-ts/wallet/test-utils';

import type { DeployContractOptions } from '../contract-factory';
import ContractFactory from '../contract-factory';

interface DeployContractConfig {
  projectDir: string;
  options?: DeployContractOptions;
}

interface TestNodeLauncherOptions {
  providerOptions: Partial<ProviderOptions>;
  walletConfig: WalletConfig;
  nodeOptions: LaunchNodeOptions;
  deployContracts: DeployContractConfig[];
}

export class TestNodeLauncher {
  static async launch({
    providerOptions = {},
    walletConfig,
    nodeOptions = {},
    deployContracts = [],
  }: Partial<TestNodeLauncherOptions> = {}): Promise<
    {
      wallets: WalletUnlocked[];
      provider: Provider;
      contracts: Contract[];
    } & AsyncDisposable
  > {
    const { provider, wallets, cleanup } = await launchCustomProviderAndGetWallets(
      {
        walletConfig,
        providerOptions,
        nodeOptions,
      },
      false
    );

    // Da li napraviti zaseban wallet ili definisati onako kako su u rust-sdk uradili da mora specificirati ime za deployanje?
    const contracts = [];

    if (deployContracts.length > 0) {
      const factories = deployContracts.map((config) =>
        TestNodeLauncher.prepareContractFactory(config, wallets[0])
      );

      for (const f of factories) {
        const contract = await f.factory.deployContract(f.deployConfig);
        contracts.push(contract);
      }
    }

    return { provider, wallets, contracts, [Symbol.asyncDispose]: cleanup };
  }

  private static prepareContractFactory(
    contractConfig: DeployContractConfig,
    wallet: WalletUnlocked
  ) {
    const { abiContents, binHexlified, storageSlots } = getForcProject<JsonAbi>(
      contractConfig.projectDir
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    return {
      factory,
      deployConfig: {
        ...contractConfig.options,
        storageSlots: contractConfig.options?.storageSlots ?? storageSlots,
      },
    };
  }
}
