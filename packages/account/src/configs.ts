export const FUEL_NETWORK_URL: string =
  typeof process !== 'undefined'
    ? process?.env?.FUEL_NETWORK_URL || 'http://127.0.0.1:4000/v1/graphql'
    : 'http://127.0.0.1:4000/v1/graphql';

export const FUEL_BETA_5_NETWORK_URL: string = 'https://beta-5.fuel.network/graphql';
export const FUEL_TEST_NET_NETWORK_URL: string = 'https://testnet.swayswap.io/v1/graphql';
