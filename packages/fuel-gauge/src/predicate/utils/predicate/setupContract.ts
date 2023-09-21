import type { BytesLike } from '@ethersproject/bytes';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { BaseAssetId, ContractFactory } from 'fuels';
import type { Interface, JsonAbi, Provider } from 'fuels';

export type SetupConfig = {
  contractBytecode: BytesLike;
  abi: JsonAbi | Interface;
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

export const setupContractWithConfig =
  (defaultConfig: SetupConfig) => async (provider: Provider, config?: Partial<SetupConfig>) =>
    setup(provider, {
      contractBytecode: defaultConfig.contractBytecode,
      abi: defaultConfig.abi,
      ...config,
    });
