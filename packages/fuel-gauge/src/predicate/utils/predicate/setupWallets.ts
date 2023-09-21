import { Wallet } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { Provider } from 'fuels';
import { Address, BaseAssetId } from 'fuels';

export const setupWallets = async (provider: Provider) => {
  const wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom(), provider);
  return [wallet, receiver] as const;
};
