// #region provider-instantiation
import { Provider, WalletUnlocked } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// Create the provider
const provider = new Provider(LOCAL_NETWORK_URL);

// Querying the blockchain
const { consensusParameters } = await provider.getChain();

// Create a new wallet
const wallet = WalletUnlocked.generate({ provider });

// Get the balances of the wallet (this will be empty until we have assets)
const { balances } = await wallet.getBalances();
// []
// #endregion provider-instantiation

console.log('provider', provider);
console.log('consensusParameters', consensusParameters);
console.log('balances', balances);
