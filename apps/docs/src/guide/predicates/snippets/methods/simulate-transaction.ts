// #region simulateTransaction
import {
  bn,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

const predicate = new ReturnTruePredicate({
  provider,
});

const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  provider.getBaseAssetId()
);
await fundPredicate.waitForResult();

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

const hasReturnReceipt = result.receipts.some(
  (receipt) => receipt.type === ReceiptType.Return
);
const hasScriptResultReceipt = result.receipts.some(
  (receipt) => receipt.type === ReceiptType.ScriptResult
);

console.log('Should have return receipt', hasReturnReceipt);
console.log('Should have script result receipt', hasScriptResultReceipt);
