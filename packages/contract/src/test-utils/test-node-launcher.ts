import type { JsonAbi } from '@fuel-ts/abi-coder';
import { FuelError } from '@fuel-ts/errors';
import type { Contract } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import type { LaunchCustomProviderAndGetWalletsOptions } from '@fuel-ts/wallet/test-utils';
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

interface TestNodeLauncherOptions extends LaunchCustomProviderAndGetWalletsOptions {
  deployContracts: (DeployContractConfig | string)[];
}

interface TestNodeLauncherReturn<TContracts> {
  wallets: WalletUnlocked[];
  provider: Provider;
  contracts: TContracts;
}

export class TestNodeLauncher {
  static async launch<
    TContracts extends Contract[] = Contract[],
    Dispose extends boolean = true,
    ReturnType = TestNodeLauncherReturn<TContracts> &
      (Dispose extends true ? AsyncDisposable : { cleanup: () => Promise<void> }),
  >(
    {
      providerOptions = {},
      walletConfig,
      nodeOptions = {},
      deployContracts = [],
    }: Partial<TestNodeLauncherOptions> = {},
    dispose?: Dispose
  ): Promise<ReturnType> {
    const { provider, wallets, cleanup } = await launchCustomProviderAndGetWallets(
      {
        walletConfig,
        providerOptions,
        nodeOptions,
      },
      false
    );

    try {
      const contracts = await TestNodeLauncher.deployContracts(deployContracts, wallets);

      return (
        dispose ?? true
          ? {
              provider,
              wallets,
              contracts: contracts as TContracts,
              [Symbol.asyncDispose]: cleanup,
            }
          : {
              provider,
              wallets,
              contracts: contracts as TContracts,
              cleanup,
            }
      ) as ReturnType;
    } catch (err) {
      await cleanup();
      throw err;
    }
  }

  private static async deployContracts(
    deployContracts: TestNodeLauncherOptions['deployContracts'],
    wallets: WalletUnlocked[]
  ) {
    const contracts: Contract[] = [];

    if (deployContracts.length === 0) return contracts;

    const factories = deployContracts.map((config) => {
      if (typeof config === 'string') {
        return TestNodeLauncher.prepareContractFactory(config, undefined, wallets[0]);
      }
      if (config.walletIndex && (config.walletIndex < 0 || config.walletIndex >= wallets.length)) {
        throw new FuelError(
          FuelError.CODES.INVALID_INPUT_PARAMETERS,
          `Invalid walletIndex ${config.walletIndex}; wallets array contains ${wallets.length} elements.`
        );
      }

      return TestNodeLauncher.prepareContractFactory(
        config.contractDir,
        config.options,
        wallets[config.walletIndex ?? 0]
      );
    });

    for (let i = 0; i < factories.length; i++) {
      const f = factories[i];
      const contract = await f.factory.deployContract({
        gasPrice: f.factory.account?.provider.getGasConfig().minGasPrice,
        ...f.deployConfig,
      });
      contracts.push(contract);
    }

    return contracts;
  }

  private static prepareContractFactory(
    contractDir: string,
    deployOptions: DeployContractConfig['options'],
    wallet: WalletUnlocked
  ) {
    const { abiContents, binHexlified, storageSlots } = getForcProject<JsonAbi>(contractDir);

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    return {
      factory,
      deployConfig: {
        ...deployOptions,
        storageSlots: deployOptions?.storageSlots ?? storageSlots,
      },
    };
  }
}
