import { B256Address } from "@fuel-ts/address";
import { NetworkEthereum, NetworkFuel } from "./types";

export const MAINNET_ASSET_API_URL = 'https://mainnet-explorer.fuel.network'
export const TESTNET_ASSET_API_URL = 'https://testnet-explorer.fuel.network'

export interface PaginationOptions {
  last: number;
}

export interface PageInfo {
  count: number;
}

const request = async <TResponse>(url: string, slug: string): Promise<TResponse | null> => {
  const response = await fetch(`${url}${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  try {
    return await response.json() satisfies TResponse;
  } catch (error) {
    // The API returns a 200 status code but the response is not valid JSON
    return null;
  }
};

const buildQueryString = (parameters: Record<string, string | { toString: () => string }>) => {
  const query = new URLSearchParams();
  Object.entries(parameters).forEach(([key, value]) => {
    query.set(key, value.toString());
  });
  return query.size > 0 ? `?${query.toString()}` : '';
};

export interface AssetInfo {
  assetId: string;
  contractId?: string;
  subId?: string;
  name: string;
  symbol: string;
  decimals: number;
  suspicious: boolean;
  verified: boolean;
  totalSupply?: string;
  networks?: (NetworkEthereum | NetworkFuel)[];
  rate?: number;
  icon?: string;
  owner?: string;
  amount?: string;
  amountInUsd?: string;
  uri?: string;
  metadata: Record<string, string>;
  collection?: string;
  isNFT?: boolean;
}

/**
 * Get information about any asset (including NFTs)
 *
 * @param url {string} - The Base URL of the explorer API
 * @param assetId {string} - The ID of the asset to get information about
 * @returns {Promise<AssetInfo>} - The information about the asset
 *
 * @see {@link https://github.com/FuelLabs/fuel-explorer/wiki/Assets-API#instructions-for-consuming-assets-data-from-indexer-api}
 */
export const getAssetById = (url: string, assetId: B256Address): Promise<AssetInfo | null> => {
  return request<AssetInfo>(url, `/assets/${assetId}`);
};

export interface AssetsByOwnerResponse {
  data: AssetInfo[];
  pageInfo: PageInfo;
}

/**
 * Get assets by owner
 *
 * @param url - The Base URL of the explorer API
 * @param owner - The owner of the assets
 * @param pagination - The pagination options (default: 10)
 * @returns {Promise<AssetsByOwnerResponse>} - The assets by owner
 *
 * @see {@link https://github.com/FuelLabs/fuel-explorer/wiki/Assets-API#instructions-for-consuming-assets-data-owned-by-an-account-from-indexer-api}
 */
export const getAssetsByOwner = (url: string, owner: B256Address, pagination: PaginationOptions = { last: 10 }): Promise<AssetsByOwnerResponse | null> => {
  const { last } = pagination;
  const queryString = buildQueryString({ last });
  return request<AssetsByOwnerResponse>(url, `/accounts/${owner}/assets${queryString}`);
};