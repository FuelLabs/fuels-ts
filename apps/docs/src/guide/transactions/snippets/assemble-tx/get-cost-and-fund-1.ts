import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = await provider.getBaseAssetId();

// #region get-cost-and-fund-1
const transferAmount = 100;

const request = new ScriptTransactionRequest();

// Add a coin output to transfer 100 base asset to account
request.addCoinOutput(accountB.address, transferAmount, baseAssetId);

const txCost = await accountA.getTransactionCost(request);

request.maxFee = txCost.maxFee;
request.gasLimit = txCost.gasUsed;

await accountA.fund(request, txCost);

const tx = await accountA.sendTransaction(request);
const { isStatusSuccess } = await tx.waitForResult();
// #endregion get-cost-and-fund-1

console.log('isStatusSuccess', isStatusSuccess);
