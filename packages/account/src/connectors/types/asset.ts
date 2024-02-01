import type { BNInput } from '@fuel-ts/math';

export type { Asset, Fuel as AssetFuel, Ethereum as AssetEthereum } from '@fuels/assets';

export type AssetData = {
  name?: string;
  assetId: string;
  imageUrl?: string;
  symbol?: string;
  decimals?: number;
  isCustom?: boolean;
  chainId?: number;
  network?: string;
};

export type AssetAmount = AssetData & {
  amount?: BNInput;
};
