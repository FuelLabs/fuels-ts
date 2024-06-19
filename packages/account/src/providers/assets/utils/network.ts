import { CHAIN_IDS } from '../../chains';
import type { Asset, AssetEth, AssetFuel, NetworkEthereum, NetworkFuel } from '../types';

type Network = NetworkEthereum | NetworkFuel;
export type NetworkTypes = NetworkEthereum['type'] | NetworkFuel['type'];
type NetworkTypeToNetwork<T> = T extends 'ethereum' ? NetworkEthereum : T extends 'fuel' ? NetworkFuel : Network;

/**
 * Returns the default chainId for the given network
*/
export const getDefaultChainId = (networkType: NetworkTypes): number | undefined => {
  if (networkType === 'ethereum') {
    return CHAIN_IDS.eth.sepolia;
  }
  if (networkType === 'fuel') {
    return CHAIN_IDS.fuel.testnet;
  }

  return undefined;
};

export type GetAssetNetworkParams<T extends NetworkTypes | undefined> = {
  asset: Asset;
  chainId?: number;
  networkType: T;
};

/**
 * Returns the asset's network on the given network
 * eg. getAssetNetwork({ asset, chainId: 1, networkType: 'ethereum' }) will return the asset's details on Ethereum mainnet
*/
export const getAssetNetwork = <T extends NetworkTypes | undefined>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): NetworkTypeToNetwork<T> => {
  const network = asset.networks.find(
    (item) => item.chainId === chainId && item.type === networkType
  ) as NetworkTypeToNetwork<T>;

  return network;
};

/**
 * Returns the asset's details on the given network alongwith the asset itself
 * eg. getAssetWithNetwork({ asset, chainId: 1, networkType: 'ethereum' }) will return the asset's details on Ethereum mainnet and the asset itself
*/
export const getAssetWithNetwork = <T extends NetworkTypes>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): AssetEth | AssetFuel | undefined => {
  const { networks: _, ...assetRest } = asset;

  const chainIdToUse = chainId ?? getDefaultChainId(networkType);
  // use two equals(==) cuz we wan't to keep 0 as a valid chainId
  if (chainIdToUse === undefined) {
    return undefined;
  }

  const assetNetwork = getAssetNetwork({
    asset,
    chainId: chainIdToUse,
    networkType,
  });

  if (!assetNetwork) {
    return undefined;
  }

  return {
    ...assetRest,
    ...assetNetwork,
  };
};

/**
 * Returns the asset's details on Ethereum
*/
export const getAssetEth = (asset: Asset, chainId?: number): AssetEth | undefined =>
  getAssetWithNetwork({
    asset,
    networkType: 'ethereum',
    chainId,
  }) as AssetEth;

/**
 * Returns the asset's details on Fuel
*/
export const getAssetFuel = (asset: Asset, chainId?: number): AssetFuel | undefined =>
  getAssetWithNetwork({
    asset,
    networkType: 'fuel',
    chainId,
  }) as AssetFuel;
