import { setupTestProviderAndWallets } from '../../test-utils';
import { ScriptTransactionRequest } from '../transaction-request';
import { normalizeJSON } from '../utils';
import type { SerializedTransactionSummary } from '../utils/serialization';

import { assembleTransactionSummary } from './assemble-transaction-summary';
import { assembleTransactionSummaryFromSerialized } from './assemble-transaction-summary-from-serialized';

describe('assembleTransactionSummaryFromSerialized', () => {
  it('should assemble transaction summary from serialized', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const request = new ScriptTransactionRequest();
    const resources = await wallet.getResourcesToSpend([
      { assetId: await provider.getBaseAssetId(), amount: 1000 },
    ]);
    request.addResources(resources);

    // Estimate and fund
    const txCost = await wallet.getTransactionCost(request);
    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;
    await wallet.fund(request, txCost);

    // Create expected summary
    const chainId = await provider.getChainId();
    const {
      consensusParameters: {
        baseAssetId,
        txParameters: { maxInputs, maxGasPerTx },
        feeParameters: { gasPriceFactor, gasPerByte },
        gasCosts,
      },
    } = await provider.getChain();

    const expectedSummary = assembleTransactionSummary({
      id: request.getTransactionId(chainId),
      gasPerByte,
      gasPriceFactor,
      transaction: request.toTransaction(),
      transactionBytes: request.toTransactionBytes(),
      baseAssetId,
      receipts: txCost.receipts,
      maxInputs,
      gasCosts,
      maxGasPerTx,
      gasPrice: txCost.gasPrice,
    });

    // Assembled the summary from the serialized data
    const serializedSummary: SerializedTransactionSummary = {
      id: request.getTransactionId(chainId),
      transactionBytes: request.toTransactionBytes(),
      gasPrice: txCost.gasPrice.toString(),
      receipts: txCost.rawReceipts,
    };
    const assembledSummary = await assembleTransactionSummaryFromSerialized({
      provider,
      transactionSummary: serializedSummary,
    });

    expect(normalizeJSON(assembledSummary)).toEqual(normalizeJSON(expectedSummary));
  });
});
