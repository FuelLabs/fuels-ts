// #region main
import { Provider, Wallet } from 'fuels';

const ADDRESS = '0x767caf5b08eba21c561078a4d5be09bbd7f16b9eca22699a61f1edd9e456126f';

const provider = await Provider.create('https://testnet.fuel.network/v1/graphql');
const wallet = Wallet.fromAddress(ADDRESS, provider);

const { balances } = await wallet.getBalances();

const [{ assetId }] = balances;

console.log(`Asset ID for the first item should be defined:`, assetId);
// #endregion main
