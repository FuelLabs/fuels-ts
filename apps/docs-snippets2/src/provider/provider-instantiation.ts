// #region provider-instantiation
import { Provider, WalletUnlocked } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

// Create the provider
const provider = await Provider.create(LOCAL_NETWORK_URL);

// Querying the blockchain
const { consensusParameters } = provider.getChain();

// Create a new wallet
const wallet = WalletUnlocked.generate({ provider });

// Get the balances of the wallet (this will be empty until we have assets)
const { balances } = await wallet.getBalances();
// []
// #endregion provider-instantiation

expect(provider).toBeDefined();
expect(provider).toBeInstanceOf(Provider);
expect(consensusParameters).toBeDefined();
expect(consensusParameters).toBeInstanceOf(Object);
expect(balances).toEqual([]);
