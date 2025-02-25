import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';

import type { Provider } from '../..';
import { deserializeReceipt, type SerializedTransactionSummary } from '../utils/serialization';

import { assembleTransactionSummary } from './assemble-transaction-summary';

export const assembleTransactionSummaryFromSerialized = async (opts: {
  provider: Provider;
  transactionSummary: SerializedTransactionSummary;
}) => {
  const { provider, transactionSummary } = opts;
  const { id, transactionBytes, gasPrice, receipts } = transactionSummary;

  const {
    consensusParameters: {
      baseAssetId,
      txParameters: { maxInputs, maxGasPerTx },
      feeParameters: { gasPriceFactor, gasPerByte },
      gasCosts,
    },
  } = await provider.getChain();

  const [transaction] = new TransactionCoder().decode(transactionBytes, 0);

  return assembleTransactionSummary({
    id,
    transaction,
    transactionBytes,
    receipts: receipts.map(deserializeReceipt),
    gasPrice: bn(gasPrice),

    // From chain
    baseAssetId,
    maxInputs,
    gasCosts,
    maxGasPerTx,
    gasPerByte,
    gasPriceFactor,
  });
};
