import { bn } from '@fuel-ts/math';
import type { BN, BNInput } from '@fuel-ts/math';
import { ReceiptType, type Input } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type {
  GqlDependentCost,
  GqlHeavyOperation,
  GqlLightOperation,
} from '../__generated__/operations';
import type { GasCosts } from '../provider';
import type { TransactionRequestInput } from '../transaction-request';
import type {
  TransactionResultReceipt,
  TransactionResultScriptResultReceipt,
} from '../transaction-response';

/** @hidden */
export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.filter(
    (receipt) => receipt.type === ReceiptType.ScriptResult
  ) as TransactionResultScriptResultReceipt[];

  const gasUsed = scriptResult.reduce((prev, receipt) => prev.add(receipt.gasUsed), bn(0));

  return gasUsed;
};

export function resolveGasDependentCosts(byteSize: BNInput, gasDependentCost: GqlDependentCost) {
  const base = bn(gasDependentCost.base);
  let dependentValue = bn(0);
  if ('unitsPerGas' in gasDependentCost) {
    dependentValue = bn(byteSize).div(bn((<GqlLightOperation>gasDependentCost).unitsPerGas));
  } else {
    dependentValue = bn(byteSize).mul(bn((<GqlHeavyOperation>gasDependentCost).gasPerUnit));
  }
  return base.add(dependentValue);
}

export function gasUsedByInputs(
  inputs: Array<TransactionRequestInput | Input>,
  txBytesSize: number,
  gasCosts: GasCosts
) {
  const witnessCache: Array<number> = [];

  const chargeableInputs = inputs.filter((input) => {
    const isCoinOrMessage = 'owner' in input || 'sender' in input;
    if (isCoinOrMessage) {
      if ('predicate' in input && input.predicate && input.predicate !== '0x') {
        return true;
      }

      if (!witnessCache.includes(input.witnessIndex)) {
        // should charge only once for each witness
        witnessCache.push(input.witnessIndex);
        return true;
      }
    }
    return false;
  });

  const vmInitializationCost = resolveGasDependentCosts(txBytesSize, gasCosts.vmInitialization);

  const totalGas = chargeableInputs.reduce((total, input) => {
    if ('predicate' in input && input.predicate && input.predicate !== '0x') {
      return total.add(
        vmInitializationCost
          .add(resolveGasDependentCosts(arrayify(input.predicate).length, gasCosts.contractRoot))
          .add(bn(input.predicateGasUsed))
      );
    }

    return total.add(gasCosts.ecr1);
  }, bn(0));
  // Never allow gas to exceed MAX_U64
  return totalGas;
}

export interface IGetMinGasParams {
  inputs: Array<TransactionRequestInput | Input>;
  gasCosts: GasCosts;
  txBytesSize: number;
  metadataGas: BN;
  gasPerByte: BN;
}

export function getMinGas(params: IGetMinGasParams) {
  const { gasCosts, gasPerByte, inputs, metadataGas, txBytesSize } = params;

  const vmInitGas = resolveGasDependentCosts(txBytesSize, gasCosts.vmInitialization);
  const bytesGas = bn(txBytesSize).mul(gasPerByte);
  const inputsGas = gasUsedByInputs(inputs, txBytesSize, gasCosts);

  const minGas = vmInitGas.add(bytesGas).add(inputsGas).add(metadataGas).maxU64();

  return minGas;
}

export interface IGetMaxGasParams {
  witnessesLength: number;
  witnessLimit?: BN;
  gasPerByte: BN;
  minGas: BN;
  gasLimit?: BN;
  blobSize?: BN;
  maxGasPerTx: BN;
}

export function getMaxGas(params: IGetMaxGasParams) {
  const {
    gasPerByte,
    witnessesLength,
    witnessLimit,
    minGas,
    gasLimit = bn(0),
    maxGasPerTx,
  } = params;

  let remainingAllowedWitnessGas = bn(0);

  if (witnessLimit?.gt(0) && witnessLimit.gte(witnessesLength)) {
    remainingAllowedWitnessGas = bn(witnessLimit).sub(witnessesLength).mul(gasPerByte);
  }

  const maxGas = remainingAllowedWitnessGas.add(minGas).add(gasLimit);

  return maxGas.gte(maxGasPerTx) ? maxGasPerTx : maxGas;
}

export function calculateMetadataGasForTxCreate({
  gasCosts,
  stateRootSize,
  txBytesSize,
  contractBytesSize,
}: {
  gasCosts: GasCosts;
  contractBytesSize: BN;
  stateRootSize: number;
  txBytesSize: number;
}) {
  const contractRootGas = resolveGasDependentCosts(contractBytesSize, gasCosts.contractRoot);
  const stateRootGas = resolveGasDependentCosts(stateRootSize, gasCosts.stateRoot);
  const txIdGas = resolveGasDependentCosts(txBytesSize, gasCosts.s256);
  // See https://github.com/FuelLabs/fuel-specs/blob/master/src/identifiers/contract-id.md
  const contractIdInputSize = bn(4 + 32 + 32 + 32);
  const contractIdGas = resolveGasDependentCosts(contractIdInputSize, gasCosts.s256);
  const metadataGas = contractRootGas.add(stateRootGas).add(txIdGas).add(contractIdGas);
  return metadataGas.maxU64();
}

export function calculateMetadataGasForTxScript({
  gasCosts,
  txBytesSize,
}: {
  gasCosts: GasCosts;
  txBytesSize: number;
}) {
  return resolveGasDependentCosts(txBytesSize, gasCosts.s256);
}

export function calculateMetadataGasForTxBlob({
  gasCosts,
  txBytesSize,
  witnessBytesSize,
}: {
  gasCosts: GasCosts;
  txBytesSize: number;
  witnessBytesSize: number;
}) {
  const txId = resolveGasDependentCosts(txBytesSize, gasCosts.s256);
  const blobLen = resolveGasDependentCosts(witnessBytesSize, gasCosts.s256);
  return txId.add(blobLen);
}

export interface CalculateGasFeeParams {
  tip?: BN;
  gas: BN;
  gasPrice: BN;
  priceFactor: BN;
}

export const calculateGasFee = (params: CalculateGasFeeParams) => {
  const { gas, gasPrice, priceFactor, tip } = params;
  return gas.mul(gasPrice).div(priceFactor).add(bn(tip));
};
