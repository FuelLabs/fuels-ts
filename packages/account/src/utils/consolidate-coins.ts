import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { OutputType } from '@fuel-ts/transactions';
import type { TransactionType, OutputChange } from '@fuel-ts/transactions';
import { splitEvery } from 'ramda';

import { type SubmitAllCallback, type Account } from '../account';
import { calculateGasFee, ScriptTransactionRequest } from '../providers';
import type { TransactionRequest, Coin, TransactionResult } from '../providers';

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

const sortCoins = ({ coins }: { coins: Coin[] }) => coins.sort((a, b) => b.amount.cmp(a.amount));

const createOuputCoin = (opts: {
  request: TransactionRequest;
  baseAssetId: string;
  chainId: number;
}): Coin => {
  const { request, baseAssetId, chainId } = opts;

  const outputChangeIndex = request.outputs.findIndex(
    (output) => output.type === OutputType.Change && output.assetId === baseAssetId
  );
  if (outputChangeIndex === -1) {
    throw new FuelError(ErrorCode.UNKNOWN, 'No change output found');
  }

  const outputCoin = request.outputs[outputChangeIndex] as OutputChange;

  // Format the UTXO ID
  const transactionId = request.getTransactionId(chainId);
  const outputIndexPadded = Number(outputChangeIndex).toString().padStart(4, '0');

  return {
    id: `${transactionId}${outputIndexPadded}`,
    assetId: outputCoin.assetId,
    amount: outputCoin.amount,
    owner: new Address(outputCoin.to),
    blockCreated: bn(0),
    txCreatedIdx: bn(0),
  };
};

export const consolidateCoins = async ({
  account,
  assetId,
}: {
  account: Account;
  assetId: string;
}) => {
  const chainInfo = await account.provider.getChain();
  const chainId = chainInfo.consensusParameters.chainId.toNumber();
  const gasPrice = await account.provider.estimateGasPrice(10);
  const maxInputs = chainInfo.consensusParameters.txParameters.maxInputs.toNumber();
  const baseAssetId = await account.provider.getBaseAssetId();
  const isBaseAsset = assetId === baseAssetId;

  const batchSize = maxInputs;
  const numberOfFundingCoins = maxInputs;

  let funding: Coin[] = [];
  let dust: Coin[] = [];

  // We get the largest coin/s for funding purposes
  if (isBaseAsset) {
    const coins = await getAllCoins(account, baseAssetId).then(sortCoins);
    funding = coins.slice(0, numberOfFundingCoins);
    dust = coins.slice(numberOfFundingCoins);
  } else {
    funding = await getAllCoins(account, baseAssetId)
      .then(sortCoins)
      .then((coins) => coins.slice(0, numberOfFundingCoins));
    dust = await getAllCoins(account, assetId).then(({ coins }) => coins);
  }

  // There a better way of detecting whether the account has enough funds to consolidate
  if (funding.length === 0) {
    throw new FuelError(
      ErrorCode.INSUFFICIENT_FUNDS,
      `Insufficient funds to consolidate.\n\tAsset ID: ${baseAssetId}\n\tOwner: ${account.address.toB256()}`
    );
  }

  const batches = [
    ...splitEvery(batchSize, funding),
    // We leave one coin for the funding coin
    ...splitEvery(batchSize - 1, dust),
  ];

  const txs: ScriptTransactionRequest[] = batches.map((batch) => {
    const request = new ScriptTransactionRequest({
      scriptData: '0x',
    });

    // Add our dust coins as inputs
    request.addResources(batch);

    return request;
  });

  const submitAll: SubmitAllCallback = async (opts = {}) => {
    const txResponses: TransactionResult<TransactionType.Script>[] = [];
    let previousTx: ScriptTransactionRequest | undefined;

    for (let i = 0; i < txs.length; i++) {
      let currentTx = txs[i];
      const step = i + 1;

      if (previousTx) {
        const coin = createOuputCoin({
          request: previousTx,
          baseAssetId,
          chainId,
        });

        // Add the funding coin to the current tx
        currentTx.addResource(coin);
      }

      // Populate the tx with predicate data
      if (
        'populateTransactionPredicateData' in account &&
        typeof account.populateTransactionPredicateData === 'function'
      ) {
        currentTx = account.populateTransactionPredicateData(currentTx);
        currentTx = await account.provider.estimatePredicates(currentTx);
      }

      // Calculate gas and fee
      const fee = calculateGasFee({
        gasPrice,
        gas: currentTx.calculateMinGas(chainInfo),
        priceFactor: chainInfo.consensusParameters.feeParameters.gasPriceFactor,
        tip: currentTx.tip,
      });

      currentTx.maxFee = fee;
      currentTx.gasLimit = bn(1000);

      opts.onTransactionStart?.({
        tx: currentTx,
        step,
        assetId,
        transactionId: currentTx.getTransactionId(chainId),
      });

      // Send the tx
      const { waitForResult } = await account.sendTransaction(currentTx);
      const response = await waitForResult<TransactionType.Script>();
      txResponses.push(response);

      // Update the previous tx
      previousTx = currentTx;
      previousTx.outputs = response.transaction.outputs;
    }

    return {
      txResponses,
      errors: [],
    };
  };

  return {
    txs,
    totalFeeCost: txs.reduce((acc, request) => acc.add(request.maxFee), bn(0)),
    submitAll,
  };
};
