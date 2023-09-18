import { Wallet } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { Address, BaseAssetId, FUEL_NETWORK_URL, Provider } from 'fuels';

export const setupWallets = async () => {
  const provider = new Provider(FUEL_NETWORK_URL);
  const wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom());
  return [wallet, receiver] as const;
};
