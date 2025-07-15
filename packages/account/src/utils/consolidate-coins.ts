import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { type OutputChange, OutputType } from '@fuel-ts/transactions';
import { splitEvery } from 'ramda';

import { type Account } from '../account';
import { calculateGasFee, type Coin, ScriptTransactionRequest, type TransactionResult } from '../providers';

export const getAllCoins = async (account: Account, assetId?: string) => {
  const all: Coin[] = [];
  let coins: Coin[];
  let hasNextPage = true;
  let after: string | undefined;

  while (hasNextPage) {
    ({
      coins,
      pageInfo: { hasNextPage },
    } = await account.getCoins(assetId, { after }));
    all.push(...coins);
    after = coins.pop()?.id;
  }

  return { coins: all };
};

type StepResult = { tx: ScriptTransactionRequest; result: TransactionResult };
type StepError = { tx: ScriptTransactionRequest; error: Error };
type Opts = {
  coins: { funding: Coin[] };
  results: StepResult[];
};

export interface SequentialRequestOptions {
  onStepComplete?: (result: StepResult, stepIndex: number) => void;
}

export const consolidateCoins = async ({
  account,
  assetId
}: { account: Account; assetId: string }) => {

  const chainInfo = await account.provider.getChain();
  const gasPrice = await account.provider.estimateGasPrice(10);
  const baseAssetId = await account.provider.getBaseAssetId();
  const isBaseAsset = assetId === baseAssetId;
  const maxInputs = 255;
  const numberOfFundingCoins = maxInputs;

  let funding: Coin[] = [];
  let dust: Coin[] = [];

  // We get the largest coin/s for funding purposes
  if (isBaseAsset) {
    const baseAssetCoins = await getAllCoins(account, baseAssetId).then(({ coins }) =>
      coins.sort((a, b) => b.amount.cmp(a.amount))
    );

    funding = baseAssetCoins.slice(0, numberOfFundingCoins);
    dust = baseAssetCoins.slice(numberOfFundingCoins);
  } else {
    const baseAssetCoins = await getAllCoins(account, baseAssetId).then(({ coins }) =>
      coins.sort((a, b) => a.amount.cmp(b.amount))
    );
    const nonBaseAssetCoins = await getAllCoins(account, assetId).then(({ coins }) =>
      coins.sort((a, b) => a.amount.cmp(b.amount))
    );

    funding = baseAssetCoins.slice(0, numberOfFundingCoins);
    dust = nonBaseAssetCoins
  }

  // TODO: Is there a better way of detecting whether the account has enough funds to consolidate
  if (funding.length === 0) {
    throw new FuelError(
      ErrorCode.INSUFFICIENT_FUNDS,
      `Insufficient funds to consolidate.\n\tAsset ID: ${baseAssetId}\n\tOwner: ${account.address.toB256()}`
    );
  }

  const batches: Coin[][] = [
    // The first batch will add all the funding coins - the highest value base assets for consolidation
    [],
    // The rest of the batches will add the dust coins + the new funding coin (for consolidation)
    ...splitEvery(maxInputs - 1, dust),
  ];

  const steps = batches.map((batch) => async (opts: Opts) => {
    let request = new ScriptTransactionRequest({
      scriptData: '0x',
    });

    // Add change output (index 0)
    request.addChangeOutput(account.address, baseAssetId);

    // Add our dust coins as inputs
    request.addResources(batch);

    // Add our funding coins as inputs
    request.addResources(opts.coins.funding);

    if ('populateTransactionPredicateData' in account && typeof account.populateTransactionPredicateData === 'function') {
      // populating predicates inputs with predicate data
      request = account.populateTransactionPredicateData(request);
      request = await account.provider.estimatePredicates(request);
    }

    const { gasLimit, maxFee } = await account.provider.estimateTxGasAndFee({
      transactionRequest: request,
      gasPrice,
    });
    request.gasLimit = gasLimit;
    request.maxFee = maxFee;

    const minGas = request.calculateMinGas(chainInfo);

    const fee = calculateGasFee({
      gasPrice,
      gas: minGas,
      priceFactor: chainInfo.consensusParameters.feeParameters.gasPriceFactor,
      tip: request.tip,
    });

    // Ensure the funds are available for consolidation
    const totalFunding = opts.coins.funding.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    console.log({
      fee: fee.toString(),
      gasLimit: gasLimit.toString(),
      maxFee: maxFee.toString(),
      totalFunding: totalFunding.toString(),
    });

    // Send the request
    const { id, waitForResult } = await account.sendTransaction(request);
    const result = await waitForResult();

    // Get the output UTXO for the next funding coins
    const outputs = result.transaction.outputs ?? [];
    const outputChangeIndex = outputs.findIndex(
      (output) => output.type === OutputType.Change && output.assetId === baseAssetId
    );
    const outputChange = outputs[outputChangeIndex] as OutputChange;
    const outputChangeIndexFormated = Number(outputChangeIndex).toString().padStart(4, '0');
    const outputChangeCoin: Coin = {
      id: `${id}${outputChangeIndexFormated}`,
      assetId: outputChange.assetId,
      amount: outputChange.amount,
      owner: new Address(outputChange.to),
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    };

    opts.results.push({ tx: request, result });

    return {
      coins: { funding: [outputChangeCoin] },
      results: opts.results,
    };
  });

  const submitAll = async (opts: SequentialRequestOptions = {}) => {
    const { onStepComplete } = opts;
    let current: Opts = { coins: { funding }, results: [] };

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      current = await step(current);

      const result = current.results[i];
      onStepComplete?.(result, i);
    }

    return {
      results: current.results,
    };
  };

  return {
    submitAll,
    steps,
  };
};

const consolidate = async (opts: { account: Account; assetId: string }) => {
  const NUMBER_OF_FUNDING_COINS = 1;
  const { account, assetId } = opts;

  const chainInfo = await account.provider.getChain();
  const gasPrice = await account.provider.estimateGasPrice(10);
  const baseAssetId = await account.provider.getBaseAssetId();
  const isBaseAsset = assetId === baseAssetId;

  let funding: Coin[] = [];
  let dust: Coin[] = [];

  // We get the largest coin/s for funding purposes
  if (isBaseAsset) {
    const baseAssetCoins = await getAllCoins(account, baseAssetId).then(({ coins }) =>
      coins.sort((a, b) => a.amount.cmp(b.amount))
    );

    funding = baseAssetCoins.slice(-NUMBER_OF_FUNDING_COINS);
    dust = baseAssetCoins.slice(0, -NUMBER_OF_FUNDING_COINS);
  } else {
    const baseAssetCoins = await getAllCoins(account, baseAssetId).then(({ coins }) =>
      coins.sort((a, b) => a.amount.cmp(b.amount))
    );
    const nonBaseAssetCoins = await getAllCoins(account, assetId).then(({ coins }) =>
      coins.sort((a, b) => a.amount.cmp(b.amount))
    );

    funding = baseAssetCoins.slice(-NUMBER_OF_FUNDING_COINS);
    dust = nonBaseAssetCoins;
  }

  const maxInputs = 255;
  const batches: Coin[][] = splitEvery(maxInputs - funding.length - 1, dust);

  for (const batch of batches) {
    let request = new ScriptTransactionRequest({
      scriptData: '0x',
    });

    // Add change output (index 0)
    request.addChangeOutput(account.address, baseAssetId);

    // Add our dust coins as inputs
    request.addResources(batch);

    // Add our funding coins as inputs
    request.addResources(funding);

    if ('populateTransactionPredicateData' in account && typeof account.populateTransactionPredicateData === 'function') {
      // populating predicates inputs with predicate data
      request = account.populateTransactionPredicateData(request);
      request = await account.provider.estimatePredicates(request);
    }

    const { gasLimit, maxFee } = await account.provider.estimateTxGasAndFee({
      transactionRequest: request,
      gasPrice,
    });
    request.gasLimit = gasLimit;
    request.maxFee = maxFee;

    // Send the request
    const { id, waitForResult } = await account.sendTransaction(request);
    const result = await waitForResult();

    // Get the output UTXO for the next funding coins
    const outputs = result.transaction.outputs ?? [];
    const outputChangeIndex = outputs.findIndex(
      (output) => output.type === OutputType.Change && output.assetId === baseAssetId
    );
    const outputChange = outputs[outputChangeIndex] as OutputChange;
    const outputChangeIndexFormated = Number(outputChangeIndex).toString().padStart(4, '0');
    const outputChangeCoin: Coin = {
      id: `${id}${outputChangeIndexFormated}`,
      assetId: outputChange.assetId,
      amount: outputChange.amount,
      owner: new Address(outputChange.to),
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    };
    funding = [outputChangeCoin];
  }
};
