// #region simulateTransaction
import {
  bn,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';
import { SimplePredicate } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new SimplePredicate({
  provider,
});

const receiver = Wallet.generate({ provider });

// Instantiate the transaction request.
const transactionRequest = new ScriptTransactionRequest({
  gasLimit: 2000,
  maxFee: bn(0),
});

transactionRequest.addCoinOutput(
  receiver.address,
  1000000,
  provider.getBaseAssetId()
);

const txCost = await predicate.getTransactionCost(transactionRequest);

transactionRequest.gasLimit = txCost.gasUsed;
transactionRequest.maxFee = txCost.maxFee;

await predicate.fund(transactionRequest, txCost);

const result = await predicate.simulateTransaction(transactionRequest);

// #endregion simulateTransaction

const hasCallReceipt = result.receipts.some(
  (receipt) => receipt.type === ReceiptType.Call
);
const hasScriptResultReceipt = result.receipts.some(
  (receipt) => receipt.type === ReceiptType.ScriptResult
);

console.log('Should have call receipt', hasCallReceipt);
console.log('Should have script result receipt', hasScriptResultReceipt);
