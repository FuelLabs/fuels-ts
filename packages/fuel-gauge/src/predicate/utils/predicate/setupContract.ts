import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A } from '@fuel-ts/utils/test-utils';
import { ContractFactory, FUEL_NETWORK_URL, Provider } from 'fuels';
import type { Interface, JsonAbi, Contract, WalletUnlocked, BytesLike } from 'fuels';

let walletInstance: WalletUnlocked;
let contractInstance: Contract;

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
  cache?: boolean;
};

const deployContract = async (
  factory: ContractFactory,
  provider: Provider,
  useCache: boolean = true
) => {
  if (contractInstance && useCache) {
    return contractInstance;
  }
  const { minGasPrice } = provider.getGasConfig();
  const baseAssetId = provider.getBaseAssetId();
  contractInstance = await factory.deployContract({ gasPrice: minGasPrice, baseAssetId });
  return contractInstance;
};

const createWallet = async () => {
  if (walletInstance) {
    return walletInstance;
  }
  const provider = await Provider.create(FUEL_NETWORK_URL, { cacheUtxo: 10 });
  const baseAssetId = provider.getBaseAssetId();
  walletInstance = await generateTestWallet(provider, [
    [5_000_000, baseAssetId],
    [5_000_000, ASSET_A],
  ]);
  return walletInstance;
};

export const setup = async ({ contractBytecode, abi, cache }: SetupConfig) => {
  // Create wallet
  const wallet = await createWallet();
  const factory = new ContractFactory(contractBytecode, abi, wallet);
  const contract = await deployContract(factory, wallet.provider, cache);
  return contract;
};

export const setupContractWithConfig =
  (defaultConfig: SetupConfig) => async (config?: Partial<SetupConfig>) =>
    setup({
      contractBytecode: defaultConfig.contractBytecode,
      abi: defaultConfig.abi,
      ...config,
    });
