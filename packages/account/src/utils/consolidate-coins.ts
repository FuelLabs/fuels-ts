import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { OutputType } from '@fuel-ts/transactions';
import type { TransactionType, OutputChange, Output } from '@fuel-ts/transactions';
import { splitEvery } from 'ramda';

import { type SubmitAllCallback, type Account } from '../account';
import { calculateGasFee, ScriptTransactionRequest } from '../providers';
import type { Coin, TransactionResult, TransactionResponse } from '../providers';

export interface ShouldConsolidateCoinsParams {
  shouldAutoConsolidate?: boolean;
}

const CONSOLIDATABLE_ERROR_CODES = [ErrorCode.MAX_COINS_REACHED];

/**
 * @hidden
 *
 * Detects if a consolidation is required for a given error.
 *
 * @param error - The error to detect if a consolidation is required for.
 * @param account - The account to consolidate coins for.
 * @param shouldAutoConsolidate - Whether to automatically consolidate coins. Defaults to true.
 *
 * @returns true if a consolidation is required, false otherwise
 */
export const consolidateCoinsIfRequired = async (opts: {
  error: unknown;
  account: Account;
  shouldAutoConsolidate?: boolean;
}): Promise<boolean> => {
  const { error: errorUnknown, account, shouldAutoConsolidate = true } = opts;
  if (!shouldAutoConsolidate) {
    return false;
  }

  const error = FuelError.parse(errorUnknown);
  if (CONSOLIDATABLE_ERROR_CODES.includes(error.code)) {
    const { assetId, owner } = error.metadata as {
      assetId: string;
      owner: string;
    };
    return account.startConsolidation({
      owner,
      assetId,
    });
  }

  return false;
};

/**
 * @hidden
 *
 * Gets all coins for a given asset id.
 *
 * @param account - The account to get coins for.
 * @param assetId - The asset id to get coins for.
 * @returns The coins.
 */
export const getAllCoins = async (account: Account, assetId?: string) => {
  const all: Coin[] = [];
  let hasNextPage = true;
  let after: string | undefined;

  while (hasNextPage) {
    const { coins, pageInfo } = await account.getCoins(assetId, { after });
    all.push(...coins);
    after = coins.pop()?.id;
    hasNextPage = pageInfo.hasNextPage;
  }

  return { coins: all };
};

/** @hidden */
const sortCoins = ({ coins }: { coins: Coin[] }) => coins.sort((a, b) => b.amount.cmp(a.amount));

/** @hidden */
const createOuputCoin = (opts: {
  transactionId: string;
  outputs: Output[];
  baseAssetId: string;
}): Coin => {
  const { transactionId, outputs, baseAssetId } = opts;

  const outputChangeIndex = outputs.findIndex(
    (output) => output.type === OutputType.Change && output.assetId === baseAssetId
  );
  if (outputChangeIndex === -1) {
    throw new FuelError(ErrorCode.UNKNOWN, 'No change output found');
  }

  const outputCoin = outputs[outputChangeIndex] as OutputChange;

  // Format the UTXO ID
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
    let previousTx: { transactionId: string; outputs: Output[] } | undefined;

    for (let i = 0; i < txs.length; i++) {
      let currentTx = txs[i];
      const step = i + 1;

      if (previousTx) {
        const coin = createOuputCoin({
          transactionId: previousTx.transactionId,
          outputs: previousTx.outputs,
          baseAssetId,
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
      const response: TransactionResponse = await account.sendTransaction(currentTx);
      const result: TransactionResult<TransactionType.Script> =
        await response.waitForResult<TransactionType.Script>();
      txResponses.push(result);

      // Update the previous tx
      previousTx = {
        transactionId: response.id,
        outputs: result.transaction.outputs,
      };
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
