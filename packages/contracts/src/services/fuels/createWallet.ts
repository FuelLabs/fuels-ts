import type { WalletUnlocked } from '@fuel-ts/wallet';
import { Wallet } from '@fuel-ts/wallet';

export function createWallet(privateKey?: string, providerUrl?: string): WalletUnlocked {
  if (privateKey) {
    return Wallet.fromPrivateKey(privateKey, providerUrl);
  }
  if (process.env.PRIVATE_KEY) {
    return Wallet.fromPrivateKey(process.env.PRIVATE_KEY, providerUrl);
  }
  throw new Error('You must provide a privateKey via config.privateKey or env PRIVATE_KEY');
}
