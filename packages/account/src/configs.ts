// #region FUEL_NETWORK_URL
export const FUEL_NETWORK_URL: string =
  typeof process !== 'undefined'
    ? process?.env?.FUEL_NETWORK_URL || 'http://127.0.0.1:4000/graphql'
    : 'http://127.0.0.1:4000/graphql';
// #endregion FUEL_NETWORK_URL
