import { Account, BN, TESTNET_NETWORK_URL } from 'fuels';

export const Environments = {
  LOCAL: 'local',
  TESTNET: 'testnet',
} as const;
type Environment = (typeof Environments)[keyof typeof Environments];

export const CURRENT_ENVIRONMENT: Environment =
  (process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as Environment) || Environments.LOCAL;

export const NODE_URL =
  CURRENT_ENVIRONMENT === Environments.LOCAL
    ? `http://127.0.0.1:${process.env.NEXT_PUBLIC_FUEL_NODE_PORT || 4000}/v1/graphql`
    : TESTNET_NETWORK_URL;

export interface AppWallet {
  wallet?: Account;
  walletBalance?: BN;
  refreshWalletBalance?: () => Promise<void>;
}

export const TESTNET_FAUCET_LINK = 'https://faucet-testnet.fuel.network/';

export const FAUCET_PRIVATE_KEY = '0x01';

export const DOCS_URL = 'https://docs.fuel.network';
