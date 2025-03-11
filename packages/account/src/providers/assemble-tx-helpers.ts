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
  const accountIsPredicate = 'bytes' in account;

  if (accountIsPredicate) {
    assembleTxAccount.predicate = {
      predicateAddress: account.address.toB256(),
      predicate: hexlify((account as Predicate).bytes),
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
