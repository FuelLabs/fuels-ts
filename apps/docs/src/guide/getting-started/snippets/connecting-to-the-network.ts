// #region main
import { Provider } from 'fuels';

const NETWORK_URL = 'https://mainnet.fuel.network/v1/graphql';

const provider = new Provider(NETWORK_URL);

const baseAssetId = await provider.getBaseAssetId();
const chainId = await provider.getChainId();
const gasConfig = await provider.getGasConfig();

console.log('chainId', chainId);
console.log('baseAssetId', baseAssetId);
console.log('gasConfig', gasConfig);
// #endregion main
