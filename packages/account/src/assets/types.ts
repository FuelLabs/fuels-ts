export type NetworkEthereum = {
  /** type of network */
  type: 'ethereum';
  /** chain id of the network */
  chainId: number;
  /** number of decimals of the asset */
  decimals: number;
  /** address of the asset contract */
  address?: string;
};

export type NetworkFuel = {
  /** type of network */
  type: 'fuel';
  /** chain id of the network */
  chainId: number;
  /** number of decimals of the asset */
  decimals: number;
  /** assetId on the Fuel Network */
  assetId: string;
  /** the contractId of that generated the Asset on the Fuel Network */
  contractId?: string;
};

export type Asset = {
  /** name of the asset */
  name: string;
  /** description of the asset */
  symbol: string;
  /** icon of the asset */
  icon: string;
  /** asset id on Fuel Network */
  networks: Array<NetworkEthereum | NetworkFuel>;
};

export type Assets = Array<Asset>;

export type AssetEth = Omit<Asset, 'networks'> & NetworkEthereum;
export type AssetFuel = Omit<Asset, 'networks'> & NetworkFuel;
