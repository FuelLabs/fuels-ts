// #region main
import { Provider } from 'fuels';

const NETWORK_URL = 'https://mainnet.fuel.network/v1/graphql';

const provider = await Provider.create(NETWORK_URL);
const baseAsset = provider.getBaseAssetId();
const chainId = provider.getChainId();

console.log({ baseAsset, chainId });
// #endregion main
