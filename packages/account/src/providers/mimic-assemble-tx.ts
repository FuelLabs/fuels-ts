import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { hexlify, type BytesLike } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { Coin } from './coin';
import type { CoinQuantity } from './coin-quantity';
import type Provider from './provider';
import type { DryRunStatus } from './provider';
import { isCoin, type ExcludeResourcesOption } from './resource';
import {
  getRequestInputResourceOwner,
  isPredicate,
  isRequestInputCoin,
  isTransactionTypeScript,
  TransactionType,
} from './transaction-request';
import type { ScriptTransactionRequest, TransactionRequest } from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response';
import { getGasUsedFromReceipts } from './utils';

export type MimicAccount = string;
export type MimicPredicate = {
  predicateAddress: string;
  predicate: BytesLike;
  predicateData: BytesLike;
};

export type MimicRequiredBalances = {
  assetId: string;
  amount: BN;
  account: MimicAccount | MimicPredicate;
  changePolicy?: {
    change: string;
  };
};

export type MimicAssembleTxParams = {
  transactionRequest: TransactionRequest;
  blockHorizon: number;
  requiredBalances: MimicRequiredBalances[];
  feeAddressIndex: number;
  excludeInput?: ExcludeResourcesOption;
  estimatePredicates?: boolean;
  reserveGas?: number;
};

const resolveAccount = (account: MimicAccount | MimicPredicate) =>
  typeof account === 'string' ? account : account.predicateAddress;

const mimicEstimation = async (provider: Provider, params: MimicAssembleTxParams) => {
  const {
    blockHorizon,
    feeAddressIndex,
    requiredBalances,
    transactionRequest,
    estimatePredicates = true,
    // excludeInput,
    // reserveGas,
  } = params;
  const requestToEstimate = clone(transactionRequest);
  const baseAssetId = await provider.getBaseAssetId();
  const feeAmount = bn('100000000000000000');
  const payerAccount = requiredBalances[feeAddressIndex].account;

  let wasFeeCovered = false;
  const payerAddress = resolveAccount(payerAccount);

  const resources = requiredBalances.map((balance) => {
    const { account, amount, assetId } = balance;

    const resource = {} as Coin;

    const isAccountPredicate = typeof account !== 'string';

    resource.id = hexlify(randomBytes(34));
    resource.amount = amount;
    resource.assetId = assetId;
    resource.blockCreated = bn(1);
    resource.txCreatedIdx = bn(1);

    if (isAccountPredicate) {
      resource.owner = new Address(account.predicateAddress);
      resource.predicate = account.predicate;
      resource.predicateData = account.predicateData;
    } else {
      resource.owner = new Address(account);
    }

    if (resource.owner.b256Address === payerAddress && resource.assetId === baseAssetId) {
      resource.amount = resource.amount.add(feeAmount);
      wasFeeCovered = true;
    }

    return resource;
  });

  if (!wasFeeCovered) {
    resources.push({
      id: hexlify(randomBytes(34)),
      amount: feeAmount,
      assetId: baseAssetId,
      blockCreated: bn(1),
      txCreatedIdx: bn(1),
      owner: new Address(payerAddress),
    });
  }

  requestToEstimate.addResources(resources);

  const gasPrice = await provider.estimateGasPrice(blockHorizon);

  const estimatedPredicates: Record<string, BN> = {};

  if (estimatePredicates) {
    await provider.estimatePredicates(requestToEstimate);

    requestToEstimate.inputs.forEach((input) => {
      if (isPredicate(input)) {
        /**
         * TODO: Fix validation. Same predicate address can have different predicate
         * data, resulting in different gas usage.
         */
        const address = isRequestInputCoin(input) ? input.owner : input.recipient;
        estimatedPredicates[hexlify(address)] = bn(input.predicateGasUsed);
      }
    });
  }

  const isScriptTransaction = isTransactionTypeScript(requestToEstimate);
  if (isScriptTransaction) {
    requestToEstimate.gasLimit = bn(0);
  }

  // eslint-disable-next-line prefer-const
  let { maxFee, maxGas, minFee, minGas, gasLimit } = await provider.estimateTxGasAndFee({
    transactionRequest: requestToEstimate,
    gasPrice,
  });

  requestToEstimate.maxFee = maxFee;

  let receipts: TransactionResultReceipt[] = [];
  let dryRunStatus: DryRunStatus | undefined;
  let missingContractIds: string[] = [];
  let outputVariables = 0;
  let gasUsed = bn(0);

  if (isScriptTransaction) {
    requestToEstimate.gasLimit = gasLimit;

    ({ receipts, missingContractIds, outputVariables, dryRunStatus } =
      await provider.estimateTxDependencies(requestToEstimate, { gasPrice }));

    if (dryRunStatus && 'reason' in dryRunStatus) {
      throw provider.extractDryRunError(requestToEstimate, receipts, dryRunStatus);
    }

    const { maxGasPerTx } = await provider.getGasConfig();

    const pristineGasUsed = getGasUsedFromReceipts(receipts);
    gasUsed = bn(pristineGasUsed.muln(1.2)).max(maxGasPerTx.sub(minGas));

    requestToEstimate.gasLimit = gasUsed;

    ({ maxFee, maxGas, minFee, minGas } = await provider.estimateTxGasAndFee({
      transactionRequest: requestToEstimate,
      gasPrice,
    }));
  }

  return {
    minGas,
    maxGas,
    minFee,
    maxFee,
    gasPrice,
    gasUsed,
    receipts,
    missingContractIds,
    outputVariables,
    dryRunStatus,
    estimatedPredicates,
  };
};

const mimicAssemble = (
  transactionRequest: TransactionRequest,
  estimated: {
    minGas: BN;
    maxGas: BN;
    minFee: BN;
    maxFee: BN;
    gasUsed: BN;
    receipts: TransactionResultReceipt[];
    missingContractIds: string[];
    outputVariables: number;
    dryRunStatus: DryRunStatus | undefined;
  }
) => {
  const { maxFee, gasUsed, missingContractIds, outputVariables } = estimated;

  if (transactionRequest.type === TransactionType.Script) {
    // eslint-disable-next-line no-param-reassign
    transactionRequest.gasLimit = gasUsed;

    missingContractIds.forEach((contractId) => {
      (transactionRequest as ScriptTransactionRequest).addContractInputAndOutput(
        new Address(contractId)
      );
    });

    transactionRequest.addVariableOutputs(outputVariables);
  }

  // eslint-disable-next-line no-param-reassign
  transactionRequest.maxFee = maxFee;

  return transactionRequest;
};

const mimicFunding = async (params: {
  provider: Provider;
  transactionRequest: TransactionRequest;
  requiredBalances: MimicRequiredBalances[];
  estimatedFee: BN;
  feePayerIndex: number;
  gasPrice: BN;
  estimatePredicates: Record<string, BN>;
}) => {
  const {
    provider,
    transactionRequest,
    requiredBalances,
    estimatedFee,
    feePayerIndex,
    gasPrice,
    estimatePredicates,
  } = params;

  const baseAssetId = await provider.getBaseAssetId();

  const ownersToFetch: Record<string, CoinQuantity[]> = {};

  requiredBalances.forEach(({ account, amount, assetId }) => {
    const owner = resolveAccount(account);

    if (!ownersToFetch[owner]) {
      ownersToFetch[owner] = [];
    }

    ownersToFetch[owner].push({ amount, assetId });
  });

  const feePayer = resolveAccount(requiredBalances[feePayerIndex].account);

  if (!ownersToFetch[feePayer]) {
    ownersToFetch[feePayer] = [];
  }

  const found = ownersToFetch[feePayer].find((owner) => owner.assetId === baseAssetId);

  if (found) {
    found.amount = found.amount.add(estimatedFee);
  } else {
    ownersToFetch[feePayer].push({ amount: estimatedFee, assetId: baseAssetId });
  }

  for (const [owner, amountsToFetch] of Object.entries(ownersToFetch)) {
    // TODO: Consider excludedIds
    const resources = await provider.getResourcesToSpend(owner, amountsToFetch);

    // Populating predicate resources with predicate bytes and data
    resources.forEach((resource) => {
      const resourceOwner = isCoin(resource) ? resource.owner : resource.recipient;
      const predicateBalance = requiredBalances.find(
        (balance) =>
          typeof balance.account !== 'string' &&
          balance.account.predicateAddress === resourceOwner.b256Address
      );

      if (predicateBalance) {
        // eslint-disable-next-line no-param-reassign
        resource.predicate = (predicateBalance.account as MimicPredicate).predicate;
        // eslint-disable-next-line no-param-reassign
        resource.predicateData = (predicateBalance.account as MimicPredicate).predicateData;
      }
    });

    transactionRequest.addResources(resources);
  }

  for (const [address, gasUsed] of Object.entries(estimatePredicates)) {
    transactionRequest.inputs.forEach((input) => {
      if (isPredicate(input) && hexlify(getRequestInputResourceOwner(input)) === address) {
        // eslint-disable-next-line no-param-reassign
        input.predicateGasUsed = gasUsed;
      }
    });
  }

  const { maxFee: currentFee } = await provider.estimateTxGasAndFee({
    transactionRequest,
    gasPrice,
  });

  if (currentFee.lt(estimatedFee)) {
    // TODO: Ensure owner can still pay for the fee
    transactionRequest.maxFee = currentFee;
  }

  return transactionRequest;
};

export const mimicAssembleTxRequest = async (
  provider: Provider,
  assembleParams: MimicAssembleTxParams
) => {
  const { transactionRequest } = assembleParams;

  const estimation = await mimicEstimation(provider, assembleParams);

  let assembledRequest = mimicAssemble(transactionRequest, estimation);

  assembledRequest = await mimicFunding({
    provider,
    transactionRequest,
    estimatedFee: estimation.maxFee,
    estimatePredicates: estimation.estimatedPredicates,
    gasPrice: estimation.gasPrice,
    requiredBalances: assembleParams.requiredBalances,
    feePayerIndex: assembleParams.feeAddressIndex,
  });

  return {
    transactionRequest: assembledRequest,
    gasPrice: estimation.gasPrice,
  };
};
