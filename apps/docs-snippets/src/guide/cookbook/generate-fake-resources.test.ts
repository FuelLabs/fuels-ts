import type { TransactionResultReturnDataReceipt } from 'fuels';
import {
  FUEL_NETWORK_URL,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  Wallet,
  bn,
} from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

/**
 * @group node
 */
describe(__filename, () => {
  it('should generate fake resources just fine', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = Wallet.generate({ provider });
    const baseAssetId = provider.getBaseAssetId();

    const { binHexlified: scriptHexBytes } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.RETURN_SCRIPT
    );

    // #region generate-fake-resources-2
    const transactionRequest = new ScriptTransactionRequest({
      gasLimit: bn(62_000),
      maxFee: bn(60_000),
      script: scriptHexBytes,
    });

    const resources = wallet.generateFakeResources([
      {
        amount: bn(100_000),
        assetId: baseAssetId,
      },
    ]);

    transactionRequest.addResources(resources);

    const dryrunResult = await provider.call(transactionRequest);

    const returnReceipt = dryrunResult.receipts.find(
      (receipt) => receipt.type === ReceiptType.ReturnData
    ) as TransactionResultReturnDataReceipt;

    const { data: returnedValue } = returnReceipt;
    // #endregion generate-fake-resources-2

    expect(bn(returnedValue).toNumber()).toBe(1337);
    expect(dryrunResult.dryRunStatus?.type).toBe('DryRunSuccessStatus');
  });
});
