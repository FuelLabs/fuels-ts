import { Wallet } from '@fuel-ts/account';
import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { Address, FUEL_NETWORK_URL, Provider } from 'fuels';

export const setupWallets = async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const baseAssetId = provider.getBaseAssetId();
  const wallet = await generateTestWallet(provider, [[5_000_000, baseAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom(), provider);
  return [wallet, receiver] as const;
};
