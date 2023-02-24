/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { Interface, JsonAbi, Contract, BytesLike, WalletUnlocked } from 'fuels';
import { Script, NativeAssetId, Provider, ContractFactory } from 'fuels';
import { join } from 'path';

let contractInstance: Contract;
const deployContract = async (factory: ContractFactory, useCache: boolean = true) => {
  if (contractInstance && useCache) return contractInstance;
  contractInstance = await factory.deployContract();
  return contractInstance;
};

let walletInstance: WalletUnlocked;
const createWallet = async () => {
  if (walletInstance) return walletInstance;
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  walletInstance = await generateTestWallet(provider, [
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

const getFullPath = <T>(contractName: string, next: (fullPath: string) => T) =>
  next(join(__dirname, `../test-projects/${contractName}/out/debug/${contractName}`));

export const getSetupContract = (
  contractName: string
): ((config?: Partial<SetupConfig>) => Promise<Contract>) =>
  getFullPath(contractName, (fullPath: string) =>
    createSetupConfig({
      contractBytecode: readFileSync(`${fullPath}.bin`),
      abi: JSON.parse(readFileSync(`${fullPath}-abi.json`, 'utf8')),
    })
  );

export const getScript = <TInput extends any[], TOutput>(
  scriptName: string,
  wallet: WalletUnlocked
): Script<TInput, TOutput> =>
  getFullPath(
    scriptName,
    (fullPath: string) =>
      new Script(
        readFileSync(`${fullPath}.bin`),
        JSON.parse(readFileSync(`${fullPath}-abi.json`, 'utf8')),
        wallet
      )
  );
