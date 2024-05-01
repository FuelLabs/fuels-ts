import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { TransactionCreate, TransactionScript } from '@fuel-ts/transactions';
import { PolicyType, TransactionCoder, TransactionType } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { GqlFeeParameters } from '../__generated__/operations';
import type { ConsensusParameters } from '../provider';
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

export type CalculateTXFeeForSummaryParams = {
  gasPrice: BN;
  rawPayload: string;
  tip: BN;
  totalFee?: BN;
  consensusParameters: Pick<ConsensusParameters, 'gasCosts'> & {
    feeParams: FeeParams;
    maxGasPerTx: BN;
  };
};

export const calculateTXFeeForSummary = (params: CalculateTXFeeForSummaryParams): BN => {
  const {
    gasPrice,
    rawPayload,
    tip,
    totalFee,
    consensusParameters: { gasCosts, feeParams, maxGasPerTx },
  } = params;

  /**
   * If totalFee is provided it means that the TX was already processed and we could extract the fee
   * from its status
   */
  if (totalFee) {
    return totalFee;
  }

  const gasPerByte = bn(feeParams.gasPerByte);
  const gasPriceFactor = bn(feeParams.gasPriceFactor);

  const transactionBytes = arrayify(rawPayload);

  const [transaction] = new TransactionCoder().decode(transactionBytes, 0);

  const { type, witnesses, inputs, policies } = transaction as
    | TransactionCreate
    | TransactionScript;

  let metadataGas = bn(0);
  let gasLimit = bn(0);

  if (type !== TransactionType.Create && type !== TransactionType.Script) {
    return bn(0);
  }

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
    maxGasPerTx,
  });

  const maxFee = calculateGasFee({
    gasPrice,
    gas: maxGas,
    priceFactor: gasPriceFactor,
    tip,
  });

  return maxFee;
};
