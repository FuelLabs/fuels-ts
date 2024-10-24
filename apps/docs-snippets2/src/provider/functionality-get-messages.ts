// #region getMessages
import { Wallet } from 'fuels';

import { WALLET_PVT_KEY } from '../env';

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY);

// Retrieves messages from the wallet
const { messages } = await wallet.getMessages();
// #endregion getMessages

console.log(messages);
