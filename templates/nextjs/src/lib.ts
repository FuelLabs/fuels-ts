import { BN, WalletLocked, WalletUnlocked } from 'fuels';

export const CURRENT_ENVIRONMENT = process.env.NODE_ENV === 'development' ? 'local' : 'testnet';

export const NODE_URL =
  CURRENT_ENVIRONMENT === 'local'
    ? `http://127.0.0.1:${process.env.NEXT_PUBLIC_FUEL_NODE_PORT || 4000}/graphql`
    : 'https://beta-5.fuel.network/graphql';

export interface AppWallet {
  wallet?: WalletLocked | WalletUnlocked;
  walletBalance?: BN;
  refreshWalletBalance?: () => Promise<void>;
}

export const TESTNET_FAUCET_LINK = 'https://faucet-beta-5.fuel.network/';
