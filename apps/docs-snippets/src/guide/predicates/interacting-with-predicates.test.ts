import type { WalletUnlocked } from 'fuels';
import { ScriptTransactionRequest, bn, Predicate, BN } from 'fuels';
import { seedTestWallet } from 'fuels/test-utils';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let wallet: WalletUnlocked;
  let receiver: WalletUnlocked;
  let baseAssetId: string;
  let predicate: Predicate<[string]>;

  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SIMPLE_PREDICATE
  );

  const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

  beforeAll(async () => {
    wallet = await getTestWallet();
    receiver = await getTestWallet();

    baseAssetId = wallet.provider.getBaseAssetId();

    predicate = new Predicate<[string]>({
      bytecode: bin,
      provider: wallet.provider,
      abi,
      data: [inputAddress],
    });
    await seedTestWallet(predicate, [[100_000_000, baseAssetId]]);
  });

  it('should get predicate resources and add them to the predicate data', async () => {
    // #region interacting-with-predicates-1

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      gasLimit: 2000,
      maxFee: bn(0),
    });

    const predicateCoins = await predicate.getResourcesToSpend([
      { amount: 2000, assetId: baseAssetId },
    ]);

    // Add the predicate input and resources
    transactionRequest.addResources(predicateCoins);
    // #endregion interacting-with-predicates-1

    expect(transactionRequest.inputs.length).toBeGreaterThanOrEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });

  it('should successfully transfer funds to the predicate', async () => {
    const transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
    transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

    const txCost = await predicate.getTransactionCost(transactionRequest);

    transactionRequest.gasLimit = txCost.gasUsed;
    transactionRequest.maxFee = txCost.maxFee;

    await predicate.fund(transactionRequest, txCost);

    // #region interacting-with-predicates-2

    const result = await predicate.sendTransaction(transactionRequest);

    await result.waitForResult();
    // #endregion interacting-with-predicates-2

    const { isStatusSuccess } = await result.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should successfully simulate a transaction with predicate', async () => {
    // #region interacting-with-predicates-3
    const transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
    transactionRequest.addCoinOutput(receiver.address, 1000000, baseAssetId);

    const txCost = await predicate.getTransactionCost(transactionRequest);

    transactionRequest.gasLimit = txCost.gasUsed;
    transactionRequest.maxFee = txCost.maxFee;

    await predicate.fund(transactionRequest, txCost);

    const result = await predicate.simulateTransaction(transactionRequest);

    // #endregion interacting-with-predicates-3

    expect(result.receipts).toEqual([
      {
        type: 1,
        id: expect.any(String),
        val: expect.any(BN),
        pc: expect.any(BN),
        is: expect.any(BN),
      },
      {
        type: 9,
        gasUsed: expect.any(BN),
        result: expect.any(BN),
      },
    ]);
  });
});
