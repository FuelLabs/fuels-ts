import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { Provider, WalletUnlocked } from '@fuel-ts/account';
import { launchCustomProviderAndGetWallets } from '@fuel-ts/account/test-utils';
import type { LaunchCustomProviderAndGetWalletsOptions } from '@fuel-ts/account/test-utils';
import { FuelError } from '@fuel-ts/errors';
import type { Contract } from '@fuel-ts/program';
import type { ChainConfig } from '@fuel-ts/utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import { readFileSync } from 'fs';
import { mergeDeepRight } from 'ramda';

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
  /**
   * Used to specify the folder where the built binary is located.
   * Default is `release`, which corresponds  to `contractDir/out/release`.
   */
  build?: Parameters<typeof getForcProject>[0]['build'];
}

interface LaunchTestNodeOptions extends LaunchCustomProviderAndGetWalletsOptions {
  deployContracts: (DeployContractConfig | string)[];
}

interface LaunchTestNodeReturn<TContracts> {
  wallets: WalletUnlocked[];
  provider: Provider;
  contracts: TContracts;
}
function getChainConfig(nodeOptions: LaunchTestNodeOptions['nodeOptions']) {
  let envChainConfig: ChainConfig | undefined;
  if (process.env.DEFAULT_CHAIN_CONFIG_PATH) {
    envChainConfig = JSON.parse(
      readFileSync(process.env.DEFAULT_CHAIN_CONFIG_PATH, 'utf-8')
    ) as ChainConfig;
  }

  return mergeDeepRight(envChainConfig ?? {}, nodeOptions.chainConfig ?? {});
}

function getFuelCoreArgs(nodeOptions: LaunchTestNodeOptions['nodeOptions']) {
  const envArgs = process.env.DEFAULT_FUEL_CORE_ARGS
    ? process.env.DEFAULT_FUEL_CORE_ARGS.split(' ')
    : undefined;

  return nodeOptions.args ?? envArgs;
}

function getWalletForDeployment(config: DeployContractConfig, wallets: WalletUnlocked[]) {
  if (!config.walletIndex) {
    return wallets[0];
  }

  const validWalletIndex = config.walletIndex >= 0 && config.walletIndex < wallets.length;

  if (!validWalletIndex) {
    throw new FuelError(
      FuelError.CODES.INVALID_INPUT_PARAMETERS,
      `Invalid walletIndex ${config.walletIndex}; wallets array contains ${wallets.length} elements.`
    );
  }

  return wallets[config.walletIndex];
}

function prepareContractFactory(
  contractDir: string,
  deployOptions: DeployContractConfig['options'],
  wallet: WalletUnlocked,
  build: DeployContractConfig['build'] = 'release'
) {
  const contractDirPathElements = contractDir.split('/');
  const { abiContents, binHexlified, storageSlots } = getForcProject<JsonAbi>({
    projectDir: contractDir,
    projectName: contractDirPathElements[contractDirPathElements.length - 1],
    build,
  });

  const factory = new ContractFactory(binHexlified, abiContents, wallet);
  return {
    factory,
    deployConfig: {
      ...deployOptions,
      storageSlots: deployOptions?.storageSlots ?? storageSlots,
    },
  };
}

async function deployContractsToNode(
  contractConfigs: LaunchTestNodeOptions['deployContracts'],
  wallets: WalletUnlocked[]
) {
  const contracts: Contract[] = [];

  if (contractConfigs.length === 0) {
    return contracts;
  }

  const factories = contractConfigs.map((config) => {
    if (typeof config === 'string') {
      return prepareContractFactory(config, undefined, wallets[0]);
    }

    return prepareContractFactory(
      config.contractDir,
      config.options,
      getWalletForDeployment(config, wallets),
      config.build
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

export async function launchTestNode<
  TContracts extends Contract[] = Contract[],
  Dispose extends boolean = true,
  ReturnType = LaunchTestNodeReturn<TContracts> &
    (Dispose extends true ? Disposable : { cleanup: () => Promise<void> }),
>(
  {
    providerOptions = {},
    walletConfig,
    nodeOptions = {},
    deployContracts = [],
  }: Partial<LaunchTestNodeOptions> = {},
  dispose?: Dispose
): Promise<ReturnType> {
  const chainConfig = getChainConfig(nodeOptions);
  const args = getFuelCoreArgs(nodeOptions);

  const { provider, wallets, cleanup } = await launchCustomProviderAndGetWallets(
    {
      walletConfig,
      providerOptions,
      nodeOptions: {
        ...nodeOptions,
        chainConfig,
        args,
      },
    },
    false
  );

  try {
    const contracts = await deployContractsToNode(deployContracts, wallets);

    return (
      dispose ?? true
        ? {
            provider,
            wallets,
            contracts: contracts as TContracts,
            [Symbol.dispose]: cleanup,
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
