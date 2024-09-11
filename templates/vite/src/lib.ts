import { Account, BN } from 'fuels';

// The two environments for the dapp are local and testnet.
export const Environments = {
  LOCAL: 'local',
  TESTNET: 'testnet',
} as const;
type Environment = (typeof Environments)[keyof typeof Environments];

/**
 * The current environment is determined by the
 * `VITE_DAPP_ENVIRONMENT` environment variable.
 * If it's not set, the default is `local`.
 */
export const CURRENT_ENVIRONMENT: Environment =
  (process.env.VITE_DAPP_ENVIRONMENT as Environment) || Environments.LOCAL;

// The node URL is determined by the current environment too.
export const NODE_URL =
  CURRENT_ENVIRONMENT === Environments.LOCAL
    ? `http://127.0.0.1:${process.env.VITE_FUEL_NODE_PORT || 4000}/v1/graphql`
    : 'https://testnet.fuel.network/v1/graphql';

export interface AppWallet {
  wallet?: Account;
  walletBalance?: BN;
  refreshWalletBalance?: () => Promise<void>;
}

export const TESTNET_FAUCET_LINK = 'https://faucet-testnet.fuel.network/';

export const FAUCET_LINK =
  CURRENT_ENVIRONMENT === Environments.LOCAL ? '/faucet' : TESTNET_FAUCET_LINK;

export const FAUCET_PRIVATE_KEY = '0x01';

export const DOCS_URL = 'https://docs.fuel.network';

export const TESTNET_CONTRACT_ID = process.env.VITE_TESTNET_CONTRACT_ID as string;
