import { BN, WalletLocked, WalletUnlocked } from 'fuels';

export const NODE_URL = `http://127.0.0.1:${
  process.env.NEXT_PUBLIC_FUEL_NODE_PORT || 4000
}/graphql`;

export interface AppWallet {
  wallet?: WalletLocked | WalletUnlocked;
  walletBalance?: BN;
  refreshWalletBalance?: () => Promise<void>;
}
