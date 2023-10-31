import type { JsonAbi } from '@fuel-ts/abi-coder';
import { FuelError } from '@fuel-ts/errors';
import type { Contract } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import type { ChainConfig, SetupTestProviderOptions } from '@fuel-ts/providers/test-utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import type { LaunchCustomProviderAndGetWalletsOptions } from '@fuel-ts/wallet/test-utils';
import { WalletConfig, launchCustomProviderAndGetWallets } from '@fuel-ts/wallet/test-utils';
import { equals, omit } from 'ramda';

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

interface NodeInfo extends Awaited<ReturnType<typeof launchCustomProviderAndGetWallets<false>>> {
  fromCache?: boolean;
}
type TestNodeLauncherCache = {
  nodes: NodeInfo[];
  cleanups: Array<() => Promise<void>>;
  chainConfig: ChainConfig;
} & SetupTestProviderOptions;
export class TestNodeLauncher {
  private static cache: TestNodeLauncherCache | undefined = undefined;
  private static getOptions = (options?: Partial<TestNodeLauncherOptions>) => ({
    walletConfig: new WalletConfig(),
    deployContracts: [],
    nodeOptions: {},
    providerOptions: {},
    ...options,
  });

  static async killCachedNodes() {
    if (!this.cache || this.cache.cleanups.length === 0) return;

    const cleanups: Promise<void>[] = [];

    this.cache.cleanups.forEach((cleanup) => {
      cleanups.push(cleanup());
    });

    await Promise.all(cleanups);
  }

  static async prepareCache(
    count: number,
    options?: Partial<LaunchCustomProviderAndGetWalletsOptions>
  ) {
    const launchPromises: Promise<NodeInfo>[] = [];
    for (let i = 0; i < count; i++) {
      launchPromises.push(
        launchCustomProviderAndGetWallets(TestNodeLauncher.getOptions(options), false)
      );
    }

    await Promise.all(launchPromises).then((x) => {
      this.cache = {
        nodes: (this.cache?.nodes ?? []).concat(x.map((node) => ({ ...node, fromCache: true }))),
        cleanups: x.map(({ cleanup }) => cleanup),
        chainConfig: x[0].deployedChainConfig,
        providerOptions: x[0].provider.options,
        nodeOptions: options?.nodeOptions ?? {},
      };
    });
  }

  private static partialEqual(
    spec: Record<string, unknown>,
    obj: Record<string, unknown>
  ): boolean {
    let equal = true;

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(spec)) {
      if (!equal) return false;

      if (typeof value === 'object') {
        if (obj[key] === undefined) return false;

        equal = TestNodeLauncher.partialEqual(
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
    providerOptions,
  }: LaunchCustomProviderAndGetWalletsOptions) {
    const partialChainConfig = walletConfig.apply(nodeOptions.chainConfig);

    if (
      this.cache &&
      this.partialEqual(
        partialChainConfig,
        this.cache.chainConfig as unknown as Record<string, unknown>
      ) &&
      this.partialEqual(
        omit(['chain_config'], nodeOptions),
        omit(['chain_config'], this.cache.nodeOptions)
      ) &&
      this.partialEqual(providerOptions, this.cache.providerOptions)
    ) {
      console.log('using cache!');
      return this.cache.nodes.pop();
    }

    return undefined;
  }

  static async launch<
    TContracts extends Contract[] = Contract[],
    Dispose extends boolean = true,
    ReturnType = TestNodeLauncherReturn<TContracts> &
      (Dispose extends true ? AsyncDisposable : { cleanup: () => Promise<void> }),
  >(options?: Partial<TestNodeLauncherOptions>, dispose?: Dispose): Promise<ReturnType> {
    const { walletConfig, nodeOptions, providerOptions, deployContracts } =
      this.getOptions(options);

    const { provider, wallets, cleanup, fromCache } =
      (TestNodeLauncher.getFromCache({ walletConfig, nodeOptions, providerOptions }) as NodeInfo) ??
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
              [Symbol.asyncDispose]: async () => {
                if (!fromCache) await cleanup();
              },
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
