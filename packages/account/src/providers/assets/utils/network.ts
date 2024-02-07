import { CHAIN_IDS } from '../../chains';
import type { Asset, AssetEth, AssetFuel, Ethereum, Fuel } from '../types';

type Network = Ethereum | Fuel;
export type NetworkTypes = Ethereum['type'] | Fuel['type'];
type NetworkTypeToNetwork<T> = T extends 'ethereum' ? Ethereum : T extends 'fuel' ? Fuel : Network;

export const getDefaultChainId = (networkType: NetworkTypes): number | undefined => {
  if (networkType === 'ethereum') {
    return CHAIN_IDS.eth.sepolia;
  }
  if (networkType === 'fuel') {
    return CHAIN_IDS.fuel.beta5;
  }

  return undefined;
};

export type GetAssetNetworkParams<T extends NetworkTypes | undefined> = {
  asset: Asset;
  chainId?: number;
  networkType: T;
};

export const getAssetNetwork = <T extends NetworkTypes | undefined>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): NetworkTypeToNetwork<T> => {
  const network = asset.networks.find(
    (item) => item.chainId === chainId && network.type === networkType
  ) as NetworkTypeToNetwork<T>;

  return network;
};

/**
 * Returns the asset with the network information based on the provided parameters.
 * @template T - The network type.
 * @param params - The parameters to get the asset with network information.
 * @returns The asset with network information or undefined if not found.
 */
export const getAssetWithNetwork = <T extends NetworkTypes>({
  asset,
  chainId,
  networkType,
}: GetAssetNetworkParams<T>): AssetEth | AssetFuel | undefined => {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
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

export const getAssetEth = (asset: Asset, chainId?: number): AssetEth | undefined =>
  getAssetWithNetwork({
    asset,
    networkType: 'ethereum',
    chainId,
  }) as AssetEth;

export const getAssetFuel = (asset: Asset, chainId?: number): AssetFuel | undefined =>
  getAssetWithNetwork({
    asset,
    networkType: 'fuel',
    chainId,
  }) as AssetFuel;
