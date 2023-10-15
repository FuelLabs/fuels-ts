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
  /**
   * Directory of contract to be deployed. The sway program **must** be built beforehand.
   */
  contractDir: string;
  /**
   * Index of wallet to be used for deployment. Defaults to `0` (first wallet).
   */
  walletIndex?: number;
  /**
   * Options for contract deployment taken from `ContractFactory`.
   */
  options?: DeployContractOptions;
}

interface TestNodeLauncherOptions {
  providerOptions: Partial<ProviderOptions>;
  walletConfig: WalletConfig;
  nodeOptions: LaunchNodeOptions;
  deployContracts: DeployContractConfig[];
}

export class TestNodeLauncher {
  static async launch<TContracts extends Contract[] = Contract[]>({
    providerOptions = {},
    walletConfig,
    nodeOptions = {},
    deployContracts = [],
  }: Partial<TestNodeLauncherOptions> = {}): Promise<
    {
      wallets: WalletUnlocked[];
      provider: Provider;
      contracts: TContracts;
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

    const contracts = [];

    if (deployContracts.length > 0) {
      const factories = deployContracts.map((config) =>
        TestNodeLauncher.prepareContractFactory(config, wallets[config.walletIndex ?? 0])
      );

      for (let i = 0; i < factories.length; i++) {
        const f = factories[i];
        const contract = await f.factory.deployContract(f.deployConfig);
        contracts.push(contract);
      }
    }

    return {
      provider,
      wallets,
      contracts: contracts as TContracts,
      [Symbol.asyncDispose]: cleanup,
    };
  }

  private static prepareContractFactory(
    contractConfig: DeployContractConfig,
    wallet: WalletUnlocked
  ) {
    const { abiContents, binHexlified, storageSlots } = getForcProject<JsonAbi>(
      contractConfig.contractDir
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
