import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { Provider } from '../..';
import { deserializeReceipt, type TransactionSummaryJson } from '../utils/serialization';

import { assembleTransactionSummary } from './assemble-transaction-summary';

export const assembleTransactionSummaryFromJson = async (opts: {
  provider: Provider;
  transactionSummary: TransactionSummaryJson;
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

  const deserializedTransactionBytes = arrayify(transactionBytes);
  const [transaction] = new TransactionCoder().decode(deserializedTransactionBytes, 0);

  return assembleTransactionSummary({
    id,
    transaction,
    transactionBytes: deserializedTransactionBytes,
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
