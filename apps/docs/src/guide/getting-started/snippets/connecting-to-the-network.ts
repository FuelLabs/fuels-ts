// #region main
import { Provider, Wallet } from 'fuels';

const NETWORK_URL = 'https://mainnet.fuel.network/v1/graphql';
// const NETWORK_URL = 'https://testnet.fuel.network/v1/graphql';
// const NETWORK_URL = 'https://localhost:<port>/v1/graphql';

const ADDRESS =
  '0x767caf5b08eba21c561078a4d5be09bbd7f16b9eca22699a61f1edd9e456126f';

const provider = await Provider.create(NETWORK_URL);
const wallet = Wallet.fromAddress(ADDRESS, provider);

const { balances } = await wallet.getBalances();

console.log('Balances', balances);
// #endregion main
