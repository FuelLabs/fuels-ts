import type { BytesLike } from '@ethersproject/bytes';
import type { Interface, JsonAbi } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import type { Wallet } from '@fuel-ts/wallet';
import { TestUtils } from '@fuel-ts/wallet';

import type Contract from '../contracts/contract';
import ContractFactory from '../contracts/contract-factory';

let contractInstance: Contract;
const deployContract = async (factory: ContractFactory, useCache: boolean = true) => {
  if (contractInstance && useCache) return contractInstance;
  contractInstance = await factory.deployContract();
  return contractInstance;
};

let walletInstance: Wallet;
const createWallet = async () => {
  if (walletInstance) return walletInstance;
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  walletInstance = await TestUtils.generateTestWallet(provider, [
    [5_000_000, NativeAssetId],
    [5_000_000, '0x0101010101010101010101010101010101010101010101010101010101010101'],
  ]);
  return walletInstance;
};

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
  cache?: boolean;
};

export const setup = async ({ contractBytecode, abi, cache }: SetupConfig) => {
  // Create wallet
  const wallet = await createWallet();
  const factory = new ContractFactory(contractBytecode, abi, wallet);
  const contract = await deployContract(factory, cache);
  return contract;
};

export const createSetupConfig =
  (defaultConfig: SetupConfig) => async (config?: Partial<SetupConfig>) =>
    setup({
      contractBytecode: defaultConfig.contractBytecode,
      abi: defaultConfig.abi,
      ...config,
    });
