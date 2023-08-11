import type { BytesLike } from '@ethersproject/bytes';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { BaseAssetId, ContractFactory, Provider } from 'fuels';
import type { Interface, JsonAbi, Contract, WalletUnlocked } from 'fuels';

let walletInstance: WalletUnlocked;
let contractInstance: Contract;

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
  cache?: boolean;
};

const deployContract = async (factory: ContractFactory, useCache: boolean = true) => {
  if (contractInstance && useCache) return contractInstance;
  contractInstance = await factory.deployContract();
  return contractInstance;
};

const createWallet = async () => {
  if (walletInstance) return walletInstance;
  const provider = await Provider.connect('http://127.0.0.1:4000/graphql', { cacheUtxo: 10 });
  walletInstance = await generateTestWallet(provider, [
    [5_000_000, BaseAssetId],
    [5_000_000, '0x0101010101010101010101010101010101010101010101010101010101010101'],
  ]);
  return walletInstance;
};

export const setup = async ({ contractBytecode, abi, cache }: SetupConfig) => {
  // Create wallet
  const wallet = await createWallet();
  const factory = new ContractFactory(contractBytecode, abi, wallet);
  const contract = await deployContract(factory, cache);
  return contract;
};

export const setupContractWithConfig =
  (defaultConfig: SetupConfig) => async (config?: Partial<SetupConfig>) =>
    setup({
      contractBytecode: defaultConfig.contractBytecode,
      abi: defaultConfig.abi,
      ...config,
    });
