import { Account, BN } from 'fuels';

export const NODE_URL = `http://127.0.0.1:${
  process.env.NEXT_PUBLIC_FUEL_NODE_PORT || 4000
}/graphql`;

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
