import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { TransactionType } from '@fuel-ts/transactions';
import { hexlify, isDefined } from '@fuel-ts/utils';

import type { Predicate } from '../predicate';
import type { AbstractAccount } from '../types';

import type { GqlAccount } from './__generated__/operations';
import type Provider from './provider';
import type { TransactionRequest } from './transaction-request';

/**
 * Resolve the account for the `assembleTx` GraphQL input params. More specifically to the properties:
 * - feePayerAccount
 * - accountCoinQuantities[n].account
 *
 * These should be informed to the client in the following signature:
 *
 * 1 - Common Account (Not a Predicate)
 * ```ts
 * feePayerAccount: {
 *   address: string;
 * }
 * ```
 *
 * 2 - Predicate
 * ```ts
 * feePayerAccount: {
 *   predicate: {
 *     predicate: string;
 *     predicateAddress: string;
 *     predicateData: string;
 *   };
 * }
 * ```
 */
export const resolveAccountForAssembleTxParams = (account: AbstractAccount): GqlAccount => {
  const assembleTxAccount: GqlAccount = {};
  const accountIsPredicate = 'bytes' in account;

  if (accountIsPredicate) {
    assembleTxAccount.predicate = {
      predicate: hexlify((account as Predicate).bytes),
      predicateAddress: account.address.toB256(),
      predicateData: hexlify((account as Predicate).getPredicateData()),
    };
  } else {
    assembleTxAccount.address = account.address.toB256();
  }

  return assembleTxAccount;
};

export const setAndValidateGasAndFeeForAssembledTx = async <T extends TransactionRequest>(params: {
  transactionRequest: T;
  provider: Provider;
  gasPrice: BN;
  setGasLimit?: BigNumberish;
  setMaxFee?: BigNumberish;
}): Promise<T> => {
  const { gasPrice, transactionRequest, setGasLimit, setMaxFee, provider } = params;

  const gasLimitSpecified = isDefined(setGasLimit);
  const maxFeeSpecified = isDefined(setMaxFee);
  const isScriptTx = transactionRequest.type === TransactionType.Script;

  if (gasLimitSpecified && isScriptTx) {
    const requiredGasLimit = transactionRequest.gasLimit;
    if (bn(setGasLimit).lt(bn(requiredGasLimit))) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas limit '${setGasLimit}' is lower than the required: '${requiredGasLimit}'.`
      );
    }

    transactionRequest.gasLimit = bn(setGasLimit);
  }

  if (maxFeeSpecified) {
    const requiredMaxFee = transactionRequest.maxFee;
    if (bn(setMaxFee).lt(requiredMaxFee)) {
      throw new FuelError(
        ErrorCode.MAX_FEE_TOO_LOW,
        `Max fee '${setMaxFee}' is lower than the required: '${requiredMaxFee}'.`
      );
    }

    transactionRequest.maxFee = bn(setMaxFee);
  }

  if (gasLimitSpecified && !maxFeeSpecified) {
    const { maxFee: feeForGasPrice } = await provider.estimateTxGasAndFee({
      transactionRequest,
      gasPrice,
    });

    transactionRequest.maxFee = feeForGasPrice;
  }

  return transactionRequest;
};
