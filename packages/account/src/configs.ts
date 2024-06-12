export const LOCAL_NETWORK_URL = 'http://127.0.0.1:4000/v1/graphql';
export const DEVNET_NETWORK_URL = 'https://devnet.fuel.network/v1/graphql';
export const TESTNET_NETWORK_URL = 'https://testnet.fuel.network/v1/graphql';
// TODO: replace placeholder with mainnet network url
// export const NETWORK_URL = '';

export const FUEL_NETWORK_URL: string =
  typeof process !== 'undefined'
    ? process?.env?.FUEL_NETWORK_URL || LOCAL_NETWORK_URL
    : LOCAL_NETWORK_URL;
