import { B256Address } from "@fuel-ts/address";
import { NetworkEthereum, NetworkFuel } from "./types";

export const MAINNET_ASSET_API_URL = 'https://mainnet-explorer.fuel.network'
export const TESTNET_ASSET_API_URL = 'https://testnet-explorer.fuel.network'

export interface AssetPaginationOptions {
  last: number;
}

export interface AssetPageInfo {
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
 * @param opts - The options for the request
 * @param opts.url {string} - The Base URL of the explorer API (default: `MAINNET_ASSET_API_URL`)
 * @param opts.assetId {string} - The ID of the asset to get information about
 * @returns {Promise<AssetInfo>} - The information about the asset
 *
 * @see {@link https://github.com/FuelLabs/fuel-explorer/wiki/Assets-API#instructions-for-consuming-assets-data-from-indexer-api}
 */
export const getAssetById = (opts: {
  url?: string;
  assetId: B256Address;
}): Promise<AssetInfo | null> => {
  const { url = MAINNET_ASSET_API_URL, assetId } = opts;
  return request<AssetInfo>(url, `/assets/${assetId}`);
};

export interface AssetsByOwnerResponse {
  data: AssetInfo[];
  pageInfo: AssetPageInfo;
}

/**
 * Get assets by owner
 *
 * @param opts - The options for the request
 * @param opts.url {string} - The Base URL of the explorer API (default: `MAINNET_ASSET_API_URL`)
 * @param opts.owner {B256Address} - The owner of the assets
 * @param opts.pagination {AssetPaginationOptions} - The pagination options (default: 10)
 * @returns {Promise<AssetsByOwnerResponse>} - The assets by owner
 *
 * @see {@link https://github.com/FuelLabs/fuel-explorer/wiki/Assets-API#instructions-for-consuming-assets-data-owned-by-an-account-from-indexer-api}
 */
export const getAssetsByOwner = (opts: {
  url?: string;
  owner: B256Address;
  pagination?: AssetPaginationOptions;
}): Promise<AssetsByOwnerResponse | null> => {
  const { url = MAINNET_ASSET_API_URL, owner, pagination = { last: 10 } } = opts;
  const { last } = pagination;
  const queryString = buildQueryString({ last });
  return request<AssetsByOwnerResponse>(url, `/accounts/${owner}/assets${queryString}`);
};