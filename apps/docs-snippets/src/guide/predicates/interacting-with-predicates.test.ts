import type { BytesLike, JsonAbi, Provider, WalletUnlocked } from 'fuels';
import { ScriptTransactionRequest, bn, Predicate, BN, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { SimplePredicate } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Interacting with Predicates', () => {
  const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

  async function createAndFundPredicate(
    provider: Provider,
    fundedWallet: WalletUnlocked,
    inputData: [string],
    abi: JsonAbi,
    bytecode: BytesLike,
    configurableConstants?: Record<string, unknown>
  ): Promise<Predicate<string[]>> {
    const predicate = new Predicate({
      bytecode,
      provider,
      abi,
      data: [inputAddress],
      configurableConstants,
    });

    const tx1 = await fundedWallet.transfer(
      predicate.address,
      100_000_000,
      provider.getBaseAssetId()
    );
    await tx1.waitForResult();
    return predicate;
  }

  it('should get predicate resources and add them to the predicate data', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const predicate = await createAndFundPredicate(
      provider,
      fundedWallet,
      [inputAddress],
      SimplePredicate.abi,
      SimplePredicate.bytecode
    );

    // #region interacting-with-predicates-1

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      gasLimit: 2000,
      maxFee: bn(0),
    });

    const predicateCoins = await predicate.getResourcesToSpend([
      { amount: 2000, assetId: provider.getBaseAssetId() },
    ]);

    // Add the predicate input and resources
    transactionRequest.addResources(predicateCoins);
    // #endregion interacting-with-predicates-1

    expect(transactionRequest.inputs.length).toBeGreaterThanOrEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });

  it('should successfully transfer funds to the predicate', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const predicate = await createAndFundPredicate(
      provider,
      fundedWallet,
      [inputAddress],
      SimplePredicate.abi,
      SimplePredicate.bytecode
    );

    const receiver = Wallet.generate({ provider });

    const transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
    transactionRequest.addCoinOutput(receiver.address, 100, provider.getBaseAssetId());

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
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const predicate = await createAndFundPredicate(
      provider,
      fundedWallet,
      [inputAddress],
      SimplePredicate.abi,
      SimplePredicate.bytecode
    );

    const receiver = Wallet.generate({ provider });

    // #region interacting-with-predicates-3
    const transactionRequest = new ScriptTransactionRequest({ gasLimit: 2000, maxFee: bn(0) });
    transactionRequest.addCoinOutput(receiver.address, 1000000, provider.getBaseAssetId());

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
