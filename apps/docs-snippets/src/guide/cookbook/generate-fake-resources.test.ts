import type { TransactionResultReturnDataReceipt } from 'fuels';
import { ReceiptType, ScriptTransactionRequest, bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ReturnScript } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Generate fake resources', () => {
  it('should generate fake resources just fine', async () => {
    const {
      provider,
      wallets: [wallet],
    } = await launchTestNode();
    const baseAssetId = provider.getBaseAssetId();

    // #region generate-fake-resources-2
    const transactionRequest = new ScriptTransactionRequest({
      gasLimit: bn(62_000),
      maxFee: bn(60_000),
      script: ReturnScript.bytecode,
    });

    const resources = wallet.generateFakeResources([
      {
        amount: bn(100_000),
        assetId: baseAssetId,
      },
    ]);

    transactionRequest.addResources(resources);

    const dryrunResult = await provider.dryRun(transactionRequest);

    const returnReceipt = dryrunResult.receipts.find(
      (receipt) => receipt.type === ReceiptType.ReturnData
    ) as TransactionResultReturnDataReceipt;

    const { data: returnedValue } = returnReceipt;
    // #endregion generate-fake-resources-2

    expect(bn(returnedValue).toNumber()).toBe(1337);
    expect(dryrunResult.dryRunStatus?.type).toBe('DryRunSuccessStatus');
  });
});
