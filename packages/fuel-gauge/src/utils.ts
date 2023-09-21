import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { Interface, BytesLike, WalletUnlocked, JsonAbi, Provider } from 'fuels';
import { Script, ContractFactory, BaseAssetId } from 'fuels';
import { join } from 'path';

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
  cache?: boolean;
};

export const setup = async (provider: Provider, { contractBytecode, abi }: SetupConfig) => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [
    [5_000_000, BaseAssetId],
    [5_000_000, '0x0101010101010101010101010101010101010101010101010101010101010101'],
  ]);

  const factory = new ContractFactory(contractBytecode, abi, wallet);
  const contract = await factory.deployContract();
  return contract;
};

export const createSetupConfig =
  (defaultConfig: SetupConfig) => async (provider: Provider, config?: Partial<SetupConfig>) =>
    setup(provider, {
      contractBytecode: defaultConfig.contractBytecode,
      abi: defaultConfig.abi,
      ...config,
    });

const getFullPath = <T>(contractName: string, next: (fullPath: string) => T) =>
  next(join(__dirname, `../fixtures/forc-projects/${contractName}/out/debug/${contractName}`));

export const getSetupContract = (contractName: string) =>
  getFullPath(contractName, (fullPath: string) =>
    createSetupConfig({
      contractBytecode: readFileSync(`${fullPath}.bin`),
      abi: JSON.parse(readFileSync(`${fullPath}-abi.json`, 'utf8')),
    })
  );

export const getScript = <TInput extends unknown[], TOutput>(
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
