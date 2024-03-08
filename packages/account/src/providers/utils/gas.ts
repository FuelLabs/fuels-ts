import { bn } from '@fuel-ts/math';
import type { BN, BNInput } from '@fuel-ts/math';
import { ReceiptType, type Input } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { GqlDependentCost, GqlGasCosts } from '../__generated__/operations';
import type { TransactionRequestInput } from '../transaction-request';
import type {
  TransactionResultReceipt,
  TransactionResultScriptResultReceipt,
} from '../transaction-response';

/** @hidden */
export const calculatePriceWithFactor = (gas: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gas.mul(gasPrice).toNumber() / priceFactor.toNumber()));

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
  if (gasDependentCost.__typename === 'LightOperation') {
    dependentValue = bn(byteSize).div(bn(gasDependentCost.unitsPerGas));
  }
  if (gasDependentCost.__typename === 'HeavyOperation') {
    dependentValue = bn(byteSize).mul(bn(gasDependentCost.gasPerUnit));
  }
  return base.add(dependentValue);
}

export function gasUsedByInputs(
  inputs: Array<TransactionRequestInput | Input>,
  txBytesSize: number,
  gasCosts: GqlGasCosts
) {
  const witnessCache: Array<number> = [];

  const chargeableInputs = inputs.filter((input) => {
    const isCoinOrMessage = 'owner' in input || 'sender' in input;
    let isPredicate = false;
    if (isCoinOrMessage) {
      isPredicate = !!('predicate' in input && input.predicate && input.predicate !== '0x');

      if (isPredicate) {
        // all predicates UTXOs are chargeable
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
  gasCosts: GqlGasCosts;
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
}

export function getMaxGas(params: IGetMaxGasParams) {
  const { gasPerByte, witnessesLength, witnessLimit, minGas, gasLimit = bn(0) } = params;

  let remainingAllowedWitnessGas = bn(0);

  if (witnessLimit?.gt(0) && witnessLimit.gte(witnessesLength)) {
    remainingAllowedWitnessGas = bn(witnessLimit).sub(witnessesLength).mul(gasPerByte);
  }

  return remainingAllowedWitnessGas.add(minGas).add(gasLimit);
}

export function calculateMetadataGasForTxCreate({
  gasCosts,
  stateRootSize,
  txBytesSize,
  contractBytesSize,
}: {
  gasCosts: GqlGasCosts;
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
  gasCosts: GqlGasCosts;
  txBytesSize: number;
}) {
  return resolveGasDependentCosts(txBytesSize, gasCosts.s256);
}

export interface CalculateGasFeeParams {
  tip: BN;
  gas: BN;
  gasPrice: BN;
  priceFactor: BN;
}

export const calculateGasFee = (params: CalculateGasFeeParams) => {
  const { gas, gasPrice, priceFactor, tip } = params;
  return gas.mul(gasPrice).div(priceFactor).add(tip);
};
