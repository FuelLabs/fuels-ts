// #region getMessages
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

// Instantiate a provider and wallet
const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// Retrieves messages from the wallet
const { messages } = await wallet.getMessages();
// #endregion getMessages

console.log('messages', messages);
