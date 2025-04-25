/* eslint-disable @typescript-eslint/no-floating-promises */

import type { TransactionResult, PreConfirmationTransactionResult } from 'fuels';
import { TransactionStatus, ScriptTransactionRequest, sleep } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ConfigurableContractFactory } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('pre-confirmation', () => {
  const validateResult = (result?: TransactionResult) => {
    const { status } = result as TransactionResult;

    expect(status).toEqual(TransactionStatus.success);
  };

  const validatePreConfirmationResult = (
    result?: PreConfirmationTransactionResult,
    isScript = true
  ) => {
    const {
      id,
      receipts,
      status,
      resolvedOutputs,
      isPreConfirmationStatusFailure,
      isPreConfirmationStatusSuccess,
    } = result as PreConfirmationTransactionResult;

    expect(result).toBeDefined();

    expect(id).toBeDefined();
    expect(receipts).toBeDefined();
    if (isScript) {
      expect(receipts?.length).toBeGreaterThan(0);
    }
    expect(resolvedOutputs).toBeDefined();
    expect(resolvedOutputs?.length).toBeGreaterThan(0);
    expect(status).toBeDefined();
    expect(isPreConfirmationStatusFailure).toBeDefined();
    expect(isPreConfirmationStatusSuccess).toBeDefined();
  };

  it('should call waitForPreConfirmation just fine [SEND TRANSACTION]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 1200, baseAssetId);
    const { waitForPreConfirmation } = await wallet.sendTransaction(transactionRequest);

    const preConfirmationResult = await waitForPreConfirmation();

    validatePreConfirmationResult(preConfirmationResult);
  });

  it('should call waitForPreConfirmation just fine [CONTRACT CALL]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: ConfigurableContractFactory }],
    });

    const {
      contracts: [contract],
    } = launched;

    const { waitForPreConfirmation } = await contract.functions.echo_u8().call();

    const { transactionResult } = await waitForPreConfirmation();

    validatePreConfirmationResult(transactionResult);
  });

  it('should call waitForPreConfirmation just fine [DEPLOY CONTRACT]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const { waitForPreConfirmation } = await ConfigurableContractFactory.deploy(wallet);

    let transactionResult: PreConfirmationTransactionResult | undefined;

    if (waitForPreConfirmation) {
      ({ transactionResult } = await waitForPreConfirmation());
    }

    validatePreConfirmationResult(transactionResult, false);
  });

  it('should call waitForPreConfirmation and validate pre-confirmation failure', async () => {
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

    const preConfirmationResult = await waitForPreConfirmation();

    const { isPreConfirmationStatusFailure, isPreConfirmationStatusSuccess, errorReason, status } =
      preConfirmationResult;

    expect(errorReason).toBe('OutOfGas');
    expect(isPreConfirmationStatusFailure).toBeTruthy();
    expect(isPreConfirmationStatusSuccess).toBeFalsy();
    expect(status).toBe(TransactionStatus.preconfirmationFailure);

    validatePreConfirmationResult(preConfirmationResult);
  });

  it('should ensure we can listen to both callbacks at the same time[SEND TRANSACTION]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 200, baseAssetId);

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

  it('should ensure we can listen to both callbacks at the same time [CONTRACT CALL]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: ConfigurableContractFactory }],
    });

    const {
      contracts: [contract],
    } = launched;

    let finalResult: TransactionResult | undefined;
    let finalPreConfirmationResult: PreConfirmationTransactionResult | undefined;

    const { waitForPreConfirmation, waitForResult } = await contract.functions.echo_u8().call();

    waitForResult().then((result) => {
      finalResult = result.transactionResult;
    });

    waitForPreConfirmation().then((result) => {
      finalPreConfirmationResult = result.transactionResult;
    });

    // Wait for both callbacks to finish
    await sleep(1500);

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult);
  });

  it('should ensure we can listen to both callbacks at the same time [DEPLOY CONTRACT]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    let finalResult: TransactionResult | undefined;
    let finalPreConfirmationResult: PreConfirmationTransactionResult | undefined;

    const { waitForPreConfirmation, waitForResult } =
      await ConfigurableContractFactory.deploy(wallet);

    waitForResult().then((result) => {
      finalResult = result.transactionResult;
    });

    waitForPreConfirmation?.().then((result) => {
      finalPreConfirmationResult = result.transactionResult;
    });

    // Wait for both callbacks to finish
    await sleep(1500);

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult, false);
  });

  it('calling waitForResult before waitForPreConfirmation should not impact the result [SEND TRANSACTION]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 300, baseAssetId);

    const { waitForPreConfirmation, waitForResult } =
      await wallet.sendTransaction(transactionRequest);

    const finalResult = await waitForResult();
    const finalPreConfirmationResult = await waitForPreConfirmation();

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult);
  });

  it('calling waitForResult before waitForPreConfirmation should not impact the result [CONTRACT CALL]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: ConfigurableContractFactory }],
    });

    const {
      contracts: [contract],
    } = launched;

    const { waitForPreConfirmation, waitForResult } = await contract.functions.echo_u8().call();

    const { transactionResult: finalResult } = await waitForResult();
    const { transactionResult: finalPreConfirmationResult } = await waitForPreConfirmation();

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult);
  });

  it('calling waitForResult before waitForPreConfirmation should not impact the result [CONTRACT DEPLOY]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const { waitForPreConfirmation, waitForResult } =
      await ConfigurableContractFactory.deploy(wallet);

    let finalPreConfirmationResult: PreConfirmationTransactionResult | undefined;

    const { transactionResult: finalResult } = await waitForResult();
    if (waitForPreConfirmation) {
      ({ transactionResult: finalPreConfirmationResult } = await waitForPreConfirmation());
    }

    validateResult(finalResult);
    validatePreConfirmationResult(finalPreConfirmationResult, false);
  });

  it('calling callbacks multiple times should not impact the result [BLOCK CALL]', async () => {
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

  it('calling callbacks multiple times should not impact the result [NON BLOCK CALL]', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const transactionRequest = await wallet.createTransfer(wallet.address, 700, baseAssetId);

    const { waitForPreConfirmation, waitForResult } =
      await wallet.sendTransaction(transactionRequest);

    let resultOne: TransactionResult | undefined;
    let resultTwo: TransactionResult | undefined;
    let resultThree: TransactionResult | undefined;

    let preConfirmationResultOne: PreConfirmationTransactionResult | undefined;
    let preConfirmationResultTwo: PreConfirmationTransactionResult | undefined;
    let preConfirmationResultThree: PreConfirmationTransactionResult | undefined;

    waitForPreConfirmation().then((preResult1) => {
      preConfirmationResultOne = preResult1;
    });

    waitForPreConfirmation().then((preResult2) => {
      preConfirmationResultTwo = preResult2;
    });

    waitForPreConfirmation().then((preResult3) => {
      preConfirmationResultThree = preResult3;
    });

    waitForResult().then((result1) => {
      resultOne = result1;
    });

    waitForResult().then((result2) => {
      resultTwo = result2;
    });

    waitForResult().then((result3) => {
      resultThree = result3;
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
