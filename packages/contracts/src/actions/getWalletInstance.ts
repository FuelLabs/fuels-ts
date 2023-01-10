import { Wallet } from '@fuel-ts/wallet';

import type { ContractsConfig } from '../types';

export async function getWalletInstance(config: ContractsConfig) {
  if (config.privateKey) {
    return Wallet.fromPrivateKey(config.privateKey);
  }
  if (process.env.PRIVATE_KEY) {
    return Wallet.fromPrivateKey(process.env.PRIVATE_KEY);
  }
  throw new Error('You must be provide a private key via config.walletPath or env PRIVATE_KEY');
}
