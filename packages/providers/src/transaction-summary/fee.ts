import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { PolicyType, TransactionCoder, TransactionType } from '@fuel-ts/transactions';
import { getBytesCopy } from 'ethers';

import type { GqlGasCosts } from '../__generated__/operations';
import { calculatePriceWithFactor } from '../utils';
import {
  calculateMetadataGasForTxCreate,
  calculateMetadataGasForTxScript,
  getMaxGas,
  getMinGas,
} from '../utils/gas';

export type CalculateTransactionFeeParams = {
  gasUsed: BN;
  gasPerByte: BN;
  rawPayload: string;
  gasPriceFactor: BN;
  gasCosts: GqlGasCosts;
};

export const calculateTransactionFee = (params: CalculateTransactionFeeParams) => {
  const { rawPayload, gasUsed, gasPriceFactor, gasCosts, gasPerByte } = params;

  const transactionBytes = getBytesCopy(rawPayload);

  const [transaction] = new TransactionCoder().decode(getBytesCopy(rawPayload), 0);

  if (transaction.type === TransactionType.Mint) {
    return {
      feeFromGasUsed: bn(0),
      minFee: bn(0),
      maxFee: bn(0),
      fee: bn(0),
    };
  }

  const { type, witnesses, inputs, policies } = transaction as
    | TransactionCreate
    | TransactionScript;

  let metadataGas = bn(0);
  let gasLimit = bn(0);

  let feeFromGasUsed = bn(0);
  let minFee = bn(0);
  let maxFee = bn(0);
  let fee = bn(0);

  if (type === TransactionType.Create) {
    const { bytecodeWitnessIndex, storageSlots } = transaction as TransactionCreate;

    const contractBytesSize = bn(
      getBytesCopy(witnesses?.[bytecodeWitnessIndex]?.data || '0x').length
    );

    metadataGas = calculateMetadataGasForTxCreate({
      contractBytesSize,
      gasCosts,
      stateRootSize: storageSlots?.length || 0,
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

  feeFromGasUsed = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor);
  minFee = calculatePriceWithFactor(minGas, gasPrice, gasPriceFactor);
  maxFee = calculatePriceWithFactor(maxGas, gasPrice, gasPriceFactor);
  fee = minFee.add(feeFromGasUsed);

  return {
    fee,
    minFee,
    maxFee,
    feeFromGasUsed,
  };
};
