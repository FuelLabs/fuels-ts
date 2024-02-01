import type { Asset, AssetData, AssetFuel } from '../types';

export function getAssetByChain(
  asset: Asset,
  chainId: number,
  network: string = 'fuel'
): AssetData {
  const assetFuelNetwork = asset.networks.find(
    (item) => item.chainId === chainId && item.type === network
  ) as AssetFuel;

  if (!assetFuelNetwork) {
    throw new Error('Asset not found for the given chain and network.');
  }

  return {
    ...asset,
    assetId: assetFuelNetwork.assetId,
    decimals: assetFuelNetwork.decimals,
    chainId: assetFuelNetwork.chainId,
    network: assetFuelNetwork.type,
  };
}
