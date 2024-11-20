// #region signing-3
import { Address, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiverAddress = Address.fromRandom();

const request = new ScriptTransactionRequest({
  gasLimit: 10000,
});

request.addCoinOutput(receiverAddress, 1000, provider.getBaseAssetId());

const txCost = await sender.getTransactionCost(request);

request.gasLimit = txCost.gasUsed;
request.maxFee = txCost.maxFee;

await sender.fund(request, txCost);

const tx = await sender.sendTransaction(request);
await tx.waitForResult();
// #endregion signing-3

const result = await tx.waitForResult();
console.log('Transaction should be successful', result.isStatusSuccess);
