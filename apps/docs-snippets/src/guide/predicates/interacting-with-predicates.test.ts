import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { ScriptTransactionRequest, Provider, FUEL_NETWORK_URL, bn, Predicate } from 'fuels';

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
  let provider: Provider;
  let predicate: Predicate<[number]>;

  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.WHITELISTED_ADDRESS_PREDICATE
  );

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL, { cacheUtxo: 1000 });
    wallet = await getTestWallet();
    receiver = await getTestWallet();

    predicate = new Predicate<[number]>({
      bytecode: bin,
      provider,
      abi,
      inputData: [11],
    });

    baseAssetId = wallet.provider.getBaseAssetId();
  });

  it('should successfully populate the transaction with predicate data', async () => {
    // #region interacting-with-predicates-1
    let transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
    transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

    transactionRequest = predicate.populateTransactionPredicateData(transactionRequest);
    transactionRequest = await provider.estimatePredicates(transactionRequest);

    const { gasLimit, maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

    transactionRequest.gasLimit = gasLimit;
    transactionRequest.maxFee = maxFee;

    const tx = await provider.sendTransaction(transactionRequest);
    // #endregion interacting-with-predicates-1

    const { isStatusSuccess } = await tx.waitForResult();

    expect(isStatusSuccess).toBeTruthy();
  });

  it('should successfully transfer funds to the predicate', async () => {
    // #region interacting-with-predicates-2
    const transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
    transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

    const txCost = await provider.getTransactionCost(transactionRequest, {
      resourcesOwner: predicate,
    });

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
    transactionRequest.addCoinOutput(receiver.address, 100, baseAssetId);

    const txCost = await provider.getTransactionCost(transactionRequest, {
      resourcesOwner: predicate,
    });

    transactionRequest.gasLimit = txCost.gasUsed;
    transactionRequest.maxFee = txCost.maxFee;

    await predicate.fund(transactionRequest, txCost);

    const result = await predicate.simulateTransaction(transactionRequest);
    // #endregion interacting-with-predicates-3

    expect(result.dryRunStatus).toEqual({
      type: 'DryRunSuccessStatus',
      programState: expect.any(Object),
      totalFee: expect.any(String),
      totalGas: expect.any(String),
    });
  });

  it('should get predicate resources and add them to the predicate data', async () => {
    // #region interacting-with-predicates-4

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
    // #endregion interacting-with-predicates-4

    expect(transactionRequest.inputs.length).toBeGreaterThanOrEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });
});
