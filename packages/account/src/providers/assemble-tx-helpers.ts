import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { TransactionType } from '@fuel-ts/transactions';
import { hexlify, isDefined } from '@fuel-ts/utils';

import type { Predicate } from '../predicate';
import type { AbstractAccount } from '../types';

import type { AssembleTxAccount } from './provider';
import type Provider from './provider';
import type { TransactionRequest } from './transaction-request';

export const resolveAccountForAssembleTxParams = (account: AbstractAccount): AssembleTxAccount => {
  const assembleTxAccount: AssembleTxAccount = {};
  const accountIsPredicate = !!account && 'bytes' in account;

  if (accountIsPredicate) {
    assembleTxAccount.predicate = {
      predicateAddress: account.address.b256Address,
      predicate: hexlify((account as Predicate).bytes),
      predicateData: hexlify((account as Predicate).getPredicateData()),
    };
  } else {
    assembleTxAccount.address = account.address.b256Address;
  }

  return assembleTxAccount;
};

export const setAndValidateGasAndFee = async <T extends TransactionRequest>(params: {
  provider: Provider;
  transactionRequest: T;
  gasPrice: BN;
  requiredGasLimit?: BN;
  requiredMaxFee: BN;
  setGasLimit?: BigNumberish;
  setMaxFee?: BigNumberish;
}): Promise<T> => {
  const {
    gasPrice,
    requiredMaxFee,
    transactionRequest,
    requiredGasLimit,
    setGasLimit,
    setMaxFee,
    provider,
  } = params;

  const gasLimitSpecified = isDefined(setGasLimit);
  const maxFeeSpecified = isDefined(setMaxFee);
  const isScriptTx = transactionRequest.type === TransactionType.Script;

  if (gasLimitSpecified && isScriptTx) {
    if (bn(setGasLimit).lt(bn(requiredGasLimit))) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas limit '${setGasLimit}' is lower than the required: '${requiredGasLimit}'.`
      );
    }

    transactionRequest.gasLimit = bn(setGasLimit);
  }

  if (maxFeeSpecified) {
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
