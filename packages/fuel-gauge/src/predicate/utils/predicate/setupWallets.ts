import { Wallet } from '@fuel-ts/account';
import { Address, FUEL_NETWORK_URL, Provider } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

export const setupWallets = async () => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  const baseAssetId = provider.getBaseAssetId();
  const wallet = await generateTestWallet(provider, [[100_000_000_000, baseAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom(), provider);
  return [wallet, receiver] as const;
};
