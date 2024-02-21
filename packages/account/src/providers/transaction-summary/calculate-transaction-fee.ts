import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { PolicyType, TransactionCoder, TransactionType } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { GqlConsensusParameters, GqlFeeParameters } from '../__generated__/operations';
import { calculatePriceWithFactor } from '../utils';
import {
  calculateMetadataGasForTxCreate,
  calculateMetadataGasForTxScript,
  getMaxGas,
  getMinGas,
} from '../utils/gas';

type FeeParams =
  | Pick<GqlFeeParameters, 'gasPerByte' | 'gasPriceFactor'>
  | {
      gasPerByte: BN | number;
      gasPriceFactor: BN | number;
    };

export type CalculateTransactionFeeParams = {
  gasUsed: BN;
  rawPayload: string;
  consensusParameters: Pick<GqlConsensusParameters, 'gasCosts'> & { feeParams: FeeParams };
};

export const calculateTransactionFee = (params: CalculateTransactionFeeParams) => {
  const {
    gasUsed,
    rawPayload,
    consensusParameters: { gasCosts, feeParams },
  } = params;

  const gasPerByte = bn(feeParams.gasPerByte);
  const gasPriceFactor = bn(feeParams.gasPriceFactor);

  const transactionBytes = arrayify(rawPayload);

  const [transaction] = new TransactionCoder().decode(transactionBytes, 0);

  if (transaction.type === TransactionType.Mint) {
    return {
      fee: bn(0),
      minFee: bn(0),
      maxFee: bn(0),
      feeFromGasUsed: bn(0),
    };
  }

  const { type, witnesses, inputs, policies } = transaction as
    | TransactionCreate
    | TransactionScript;

  let metadataGas = bn(0);
  let gasLimit = bn(0);

  if (type === TransactionType.Create) {
    const { bytecodeWitnessIndex, storageSlots } = transaction as TransactionCreate;

    const contractBytesSize = bn(arrayify(witnesses[bytecodeWitnessIndex].data).length);

    metadataGas = calculateMetadataGasForTxCreate({
      contractBytesSize,
      gasCosts,
      stateRootSize: storageSlots.length || 0,
      txBytesSize: transactionBytes.length,
    });
  } else {
    const { scriptGasLimit } = transaction;

    if (scriptGasLimit) {
      gasLimit = scriptGasLimit;
    }

    metadataGas = calculateMetadataGasForTxScript({
      gasCosts,
      txBytesSize: transactionBytes.length,
    });
  }

  const minGas = getMinGas({
    gasCosts,
    gasPerByte: bn(gasPerByte),
    inputs,
    metadataGas,
    txBytesSize: transactionBytes.length,
  });

  const gasPrice = bn(policies.find((policy) => policy.type === PolicyType.GasPrice)?.data);
  const witnessLimit = policies.find((policy) => policy.type === PolicyType.WitnessLimit)?.data as
    | BN
    | undefined;

  const witnessesLength = witnesses.reduce((acc, wit) => acc + wit.dataLength, 0);

  const maxGas = getMaxGas({
    gasPerByte,
    minGas,
    witnessesLength,
    gasLimit,
    witnessLimit,
  });

  const feeFromGasUsed = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor);
  const minFee = calculatePriceWithFactor(minGas, gasPrice, gasPriceFactor);
  const maxFee = calculatePriceWithFactor(maxGas, gasPrice, gasPriceFactor);
  const fee = minFee.add(feeFromGasUsed);

  return {
    fee,
    minFee,
    maxFee,
    feeFromGasUsed,
  };
};
