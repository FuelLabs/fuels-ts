import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { PolicyType, TransactionCoder, TransactionType } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { GqlConsensusParameters, GqlFeeParameters } from '../__generated__/operations';
import {
  calculateGasFee,
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
  tip: BN;
  consensusParameters: Pick<GqlConsensusParameters, 'gasCosts'> & { feeParams: FeeParams };
};

export const calculateTransactionFee = (params: CalculateTransactionFeeParams) => {
  const {
    gasUsed,
    rawPayload,
    tip,
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

  /**
   * TODO: Validate this calculation
   * Ideally we should calculate the fee using the gas price value that was used
   * to process the transaction. The gas price value is not available within the
   * transaction object and there is no ( directly at least ) way to retrieve it.
   */
  const feeFromGasUsed = calculateGasFee({
    gasPrice: bn(1),
    gas: gasUsed,
    priceFactor: gasPriceFactor,
    tip,
  });

  const minFee = calculateGasFee({
    gasPrice: bn(1),
    gas: minGas,
    priceFactor: gasPriceFactor,
    tip,
  });

  const maxFee = calculateGasFee({
    gasPrice: bn(1),
    gas: maxGas,
    priceFactor: gasPriceFactor,
    tip,
  });

  return {
    // TODO: Validate if we need to return all these props here. It seems we are
    // only interested in the fee value.
    fee: maxFee,
    minFee,
    maxFee,
    feeFromGasUsed,
  };
};
