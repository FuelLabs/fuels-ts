// #region main
import { Provider, Wallet } from 'fuels';

import { NETWORK_URL } from '../env';

const ADDRESS = '0x767caf5b08eba21c561078a4d5be09bbd7f16b9eca22699a61f1edd9e456126f';

const provider = await Provider.create(NETWORK_URL);
const wallet = Wallet.fromAddress(ADDRESS, provider);

const { balances } = await wallet.getBalances();

console.assert(balances.length >= 0, 'Balances should be an array');
// #endregion main
