export const FUEL_NETWORK_URL =
  typeof process !== 'undefined'
    ? process?.env?.FUEL_NETWORK_URL || 'http://127.0.0.1:4000/graphql'
    : 'http://127.0.0.1:4000/graphql';

export const FUEL_LATEST_TESTNET_URL = 'https://beta-5.fuel.network/graphql';