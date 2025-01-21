import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const baseAssetId = await provider.getBaseAssetId();

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

// #region transaction-request-6
// Fetching coins
const { coins } = await wallet.getCoins(baseAssetId);
const { messages } = await wallet.getMessages();

// Adding a specific coin or message
transactionRequest.addCoinInput(coins[0]);
transactionRequest.addMessageInput(messages[0]);
// #endregion transaction-request-6
