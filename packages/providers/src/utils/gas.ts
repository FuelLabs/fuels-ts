import type { BN, BNInput } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { Input } from '@fuel-ts/transactions';
import { getBytesCopy } from 'ethers';

import type { GqlDependentCost, GqlGasCosts } from '../__generated__/operations';
import type { TransactionRequestInput } from '../transaction-request';

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
  const totalGas = inputs.reduce((total, input) => {
    if ('predicate' in input && input.predicate && input.predicate !== '0x') {
      return total.add(
        resolveGasDependentCosts(txBytesSize, gasCosts.vmInitialization)
          .add(
            resolveGasDependentCosts(getBytesCopy(input.predicate).length, gasCosts.contractRoot)
          )
          .add(bn(input.predicateGasUsed))
      );
    }
    if ('witnessIndex' in input && !witnessCache.includes(input.witnessIndex)) {
      witnessCache.push(input.witnessIndex);
      return total.add(gasCosts.ecr1);
    }
    return total;
  }, bn());
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
