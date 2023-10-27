import type { JsonAbi } from '@fuel-ts/abi-coder';
import { FuelError } from '@fuel-ts/errors';
import type { Contract } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import type { ChainConfig } from '@fuel-ts/providers/test-utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import type { LaunchCustomProviderAndGetWalletsOptions } from '@fuel-ts/wallet/test-utils';
import { WalletConfig, launchCustomProviderAndGetWallets } from '@fuel-ts/wallet/test-utils';
import { whereEq, equals } from 'ramda';

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

type NodeInfo = Awaited<ReturnType<typeof launchCustomProviderAndGetWallets<false>>>;
type Cache = {
  nodes: NodeInfo[];
  chainConfig: ChainConfig;
};
// & LaunchCustomProviderAndGetWalletsOptions;
export class TestNodeLauncher {
  private static cache: Cache | undefined = undefined;
  private static DEFAULT_OPTIONS: TestNodeLauncherOptions = {
    walletConfig: WalletConfig.DEFAULT,
    deployContracts: [],
    nodeOptions: {},
    providerOptions: {},
  };

  static async prepareCache(
    count: number,
    options?: Partial<LaunchCustomProviderAndGetWalletsOptions>
  ) {
    const launchPromises: Promise<NodeInfo>[] = [];
    const opt = options ? { ...this.DEFAULT_OPTIONS, ...options } : this.DEFAULT_OPTIONS;
    for (let i = 0; i < count; i++) {
      launchPromises.push(launchCustomProviderAndGetWallets(opt, false));
    }

    await Promise.all(launchPromises).then((x) => {
      this.cache = {
        nodes: x,
        chainConfig: x[0].deployedChainConfig,
      };
    });
  }

  private static partialEqual<T extends Record<string, unknown>>(
    spec: Record<string, unknown>,
    obj: Record<string, unknown>
  ): boolean {
    let equal = true;

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(spec)) {
      if (!equal) return false;

      if (typeof value === 'object') {
        if (obj[key] === undefined) return false;

        equal = this.partialEqual(
          value as Record<string, unknown>,
          obj[key] as Record<string, unknown>
        );
        // eslint-disable-next-line no-continue
        continue;
      }
      equal = equals(value, obj[key]);
    }

    return equal;
  }

  private static getFromCache({
    walletConfig,
    nodeOptions,
  }: LaunchCustomProviderAndGetWalletsOptions) {
    const partialChainConfig = walletConfig.apply(nodeOptions.chainConfig);

    if (
      this.cache &&
      this.partialEqual(
        partialChainConfig,
        this.cache.chainConfig as unknown as Record<string, unknown>
      )
    )
      return this.cache.nodes.pop();

    return undefined;
  }

  static async launch<
    TContracts extends Contract[] = Contract[],
    Dispose extends boolean = true,
    ReturnType = TestNodeLauncherReturn<TContracts> &
      (Dispose extends true ? AsyncDisposable : { cleanup: () => Promise<void> }),
  >(options?: Partial<TestNodeLauncherOptions>, dispose?: Dispose): Promise<ReturnType> {
    const { walletConfig, nodeOptions, providerOptions, deployContracts } = options
      ? { ...this.DEFAULT_OPTIONS, ...options }
      : this.DEFAULT_OPTIONS;

    const { provider, wallets, cleanup } =
      (this.getFromCache({ walletConfig, nodeOptions, providerOptions }) as NodeInfo) ??
      (await launchCustomProviderAndGetWallets(
        {
          walletConfig,
          providerOptions,
          nodeOptions,
        },
        false
      ));

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
      const contract = await f.factory.deployContract(f.deployConfig);
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
