import { Account, BN } from 'fuels';

// #region deploying-dapp-to-testnet-lib-current-environment
type DappEnvironment = 'local' | 'testnet';

export const CURRENT_ENVIRONMENT: DappEnvironment =
  (process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as DappEnvironment) || 'local';
// #endregion deploying-dapp-to-testnet-lib-current-environment

export const NODE_URL =
  CURRENT_ENVIRONMENT === 'local'
    ? `http://127.0.0.1:${process.env.NEXT_PUBLIC_FUEL_NODE_PORT || 4000}/graphql`
    : 'https://beta-5.fuel.network/graphql';

/**
 * Enable the Fuel dev connector.
 * @see {@link https://docs.fuel.network/docs/wallet/dev/getting-started/#using-default-connectors}
 */
export const ENABLE_FUEL_DEV_CONNECTOR = process.env.NEXT_PUBLIC_ENABLE_FUEL_DEV_CONNECTOR === 'true';

export interface AppWallet {
  wallet?: Account;
  walletBalance?: BN;
  refreshWalletBalance?: () => Promise<void>;
}

export const TESTNET_FAUCET_LINK = 'https://faucet-beta-5.fuel.network/';
