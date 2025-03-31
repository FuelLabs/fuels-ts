import type { AccountCoinQuantity } from 'fuels';
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();
const accountA = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const accountB = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const transferAmount = 100;

// #region assemble-tx-basic-usage
const request = new ScriptTransactionRequest();

request.addCoinOutput(accountB.address, transferAmount, baseAssetId);

const accountCoinQuantities: AccountCoinQuantity[] = [
  {
    amount: transferAmount,
    assetId: baseAssetId, // Asset ID
    account: accountA,
    changeOutputAccount: accountA, // Optional
  },
];

// Assemble the transaction
const { assembledRequest, gasPrice, receipts } = await provider.assembleTx({
  request,
  accountCoinQuantities,
  feePayerAccount: accountA,
  blockHorizon: 10,
  estimatePredicates: true,
});

// The assembledRequest is now ready to be signed and sent
const submit = await accountA.sendTransaction(assembledRequest);
await submit.waitForResult();
// #endregion assemble-tx-basic-usage

console.log('assembledRequest', assembledRequest);
console.log('gasPrice', gasPrice);
console.log('receipts', receipts);

const { isStatusSuccess } = await submit.waitForResult();
console.log('isStatusSuccess', isStatusSuccess);
