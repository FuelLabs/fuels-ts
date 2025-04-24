/* eslint-disable @typescript-eslint/no-floating-promises */

import type { TransactionResult, PreConfirmationTransactionResult } from 'fuels';
import { TransactionStatus, ScriptTransactionRequest, sleep } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

describe('pre-confirmation', () => {
  const validateResult = (result?: TransactionResult) => {
    const { status } = result as TransactionResult;

    expect(status).toEqual(TransactionStatus.success);
  };

  const validatePreConfirmationResult = (result?: PreConfirmationTransactionResult) => {
    const { receipts, status, resolvedOutputs, isStatusFailure, isStatusSuccess, isStatusPending } =
      result as PreConfirmationTransactionResult;

    expect(isStatusFailure).toBeFalsy();
    expect(isStatusSuccess).toBeFalsy();
    expect(isStatusPending).toBeTruthy();

    expect(status).toEqual(TransactionStatus.preconfirmationSuccess);
    expect(receipts).toBeDefined();
    expect(receipts?.length).toBeGreaterThan(0);
    expect(resolvedOutputs).toBeDefined();
    expect(resolvedOutputs?.length).toBeGreaterThan(0);
  };

  it('should execute sendTransaction just fine [preconfirmation success]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [sender, receiver],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await sender.createTransfer(receiver.address, 100, baseAssetId);
    const signedTransaction = await sender.signTransaction(transactionRequest);
    transactionRequest.updateWitnessByOwner(sender.address, signedTransaction);

    const { waitForPreConfirmation } = await provider.sendTransaction(transactionRequest);

    const preConfirmationResult = await waitForPreConfirmation();

    validatePreConfirmationResult(preConfirmationResult);
  });

  it('should execute sendTransaction just fine [preconfirmation failure]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const request = new ScriptTransactionRequest({
      gasLimit: 0,
      maxFee: 100,
    });

    const resources = await wallet.getResourcesToSpend([
      { assetId: await provider.getBaseAssetId(), amount: 100 },
    ]);

    request.addResources(resources);

    const { waitForPreConfirmation } = await wallet.sendTransaction(request);

    const { status, receipts, errorReason, isStatusFailure, isStatusSuccess } =
      await waitForPreConfirmation();

    expect(isStatusFailure).toBeTruthy();

    expect(isStatusSuccess).toBeFalsy();
    expect(errorReason).toBe('OutOfGas');
    expect(status).toBe(TransactionStatus.preconfirmationFailure);
    expect(receipts?.length).toBeGreaterThan(0);
  });

  it('should ensure we can listen to both callbacks at the same time', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 100, baseAssetId);

    const { waitForPreConfirmation, waitForResult } =
      await wallet.sendTransaction(transactionRequest);

    let finalResult: TransactionResult | undefined;
    let finalPreConfirmationResult: PreConfirmationTransactionResult | undefined;

    waitForResult().then((result) => {
      finalResult = result;
    });

    waitForPreConfirmation().then((result) => {
      finalPreConfirmationResult = result;
    });

    // Wait for both callbacks to finish
    await sleep(1500);

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult);
  });

  it('calling waitForResult before waitForPreConfirmation should not impact the result', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 100, baseAssetId);

    const { waitForPreConfirmation, waitForResult } =
      await wallet.sendTransaction(transactionRequest);

    const finalResult = await waitForResult();
    const finalPreConfirmationResult = await waitForPreConfirmation();

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult);
  });

  it('calling callbacks multiple times should not impact the result[BLOCK CALL]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 100, baseAssetId);

    const { waitForPreConfirmation, waitForResult } =
      await wallet.sendTransaction(transactionRequest);

    const resultOne = await waitForResult();
    const resultTwo = await waitForResult();
    const resultThree = await waitForResult();

    const preConfirmationResultOne = await waitForPreConfirmation();
    const preConfirmationResultTwo = await waitForPreConfirmation();
    const preConfirmationResultThree = await waitForPreConfirmation();

    validateResult(resultOne);
    validateResult(resultTwo);
    validateResult(resultThree);

    validatePreConfirmationResult(preConfirmationResultOne);
    validatePreConfirmationResult(preConfirmationResultTwo);
    validatePreConfirmationResult(preConfirmationResultThree);
  });

  it('calling callbacks multiple times should not impact the result[NON BLOCK CALL]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 100, baseAssetId);

    const { waitForPreConfirmation, waitForResult } =
      await wallet.sendTransaction(transactionRequest);

    let resultOne: TransactionResult | undefined;
    let resultTwo: TransactionResult | undefined;
    let resultThree: TransactionResult | undefined;

    let preConfirmationResultOne: PreConfirmationTransactionResult | undefined;
    let preConfirmationResultTwo: PreConfirmationTransactionResult | undefined;
    let preConfirmationResultThree: PreConfirmationTransactionResult | undefined;

    waitForResult().then((result) => {
      resultOne = result;
    });

    waitForResult().then((result) => {
      resultTwo = result;
    });

    waitForResult().then((result) => {
      resultThree = result;
    });

    waitForPreConfirmation().then((result) => {
      preConfirmationResultOne = result;
    });

    waitForPreConfirmation().then((result) => {
      preConfirmationResultTwo = result;
    });

    waitForPreConfirmation().then((result) => {
      preConfirmationResultThree = result;
    });

    await sleep(1500);

    validateResult(resultOne);
    validateResult(resultTwo);
    validateResult(resultThree);

    validatePreConfirmationResult(preConfirmationResultOne);
    validatePreConfirmationResult(preConfirmationResultTwo);
    validatePreConfirmationResult(preConfirmationResultThree);
  });
});
