import { Address } from '@fuel-ts/address';
import { NativeAssetId } from '@fuel-ts/address/configs';
import { Provider } from '@fuel-ts/providers';
import { Wallet } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';

export const setupWallets = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const wallet = await generateTestWallet(provider, [[5_000_000, NativeAssetId]]);
  const receiver = Wallet.fromAddress(Address.fromRandom());
  return [wallet, receiver] as const;
};
