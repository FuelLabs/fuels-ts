export const FUEL_NETWORK_URL: string =
  typeof process !== 'undefined'
    ? process?.env?.FUEL_NETWORK_URL || 'http://127.0.0.1:4000/v1/graphql'
    : 'http://127.0.0.1:4000/v1/graphql';

export const FUEL_TESTNET_NETWORK_URL: string = 'https://devnet.fuel.network/v1/graphql';
