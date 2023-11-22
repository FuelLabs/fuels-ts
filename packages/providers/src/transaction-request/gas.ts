import { bn } from '@fuel-ts/math';
import { getBytesCopy } from 'ethers';

import type {
  GqlConsensusParameters,
  GqlDependentCost,
  GqlGasCosts,
} from '../__generated__/operations';

import type { TransactionRequestInput } from './input';
import { TransactionType, type BaseTransactionRequest } from './transaction-request';

export function resolveGasDependentCosts(byteSize: number, gasDependentCost: GqlDependentCost) {
  const base = bn(gasDependentCost.base);
  let dependentValue = bn(0);
  if (gasDependentCost.__typename === 'LightOperation') {
    dependentValue = bn(byteSize).div(bn(gasDependentCost.unitsPerGas));
  }
  if (gasDependentCost.__typename === 'HeavyOperation') {
    dependentValue = bn(byteSize).mul(bn(gasDependentCost.gasPerUnit));
  }
  console.log(base, dependentValue, gasDependentCost.__typename);
  return base.add(dependentValue);
}

export function gasUsedByInputs(
  inputs: Array<TransactionRequestInput>,
  _txBytesSize: number, // TODO: this is going to change
  gasCosts: GqlGasCosts
) {
  const witnessCache: Array<number> = [];
  const totalGas = inputs.reduce((total, input) => {
    if ('witnessIndex' in input && !witnessCache.includes(input.witnessIndex)) {
      witnessCache.push(input.witnessIndex);
      return total.add(gasCosts.ecr1);
    }
    if ('predicate' in input && input.predicate) {
      return total.add(
        bn(gasCosts.vmInitialization)
          .add(
            resolveGasDependentCosts(getBytesCopy(input.predicate).length, gasCosts.contractRoot)
          )
          .add(bn(input.predicateGasUsed))
      );
    }
    return total;
  }, bn());
  // Never allow gas to exceed MAX_U64
  return totalGas;
}

export function getMinGas(
  transaction: BaseTransactionRequest,
  consensusParameters: GqlConsensusParameters
) {
  const { gasCosts, feeParams } = consensusParameters;
  const vmInitGas = bn(gasCosts.vmInitialization); // 2000
  console.log('vmInitGas', vmInitGas.toString());
  // 456
  const chargeableByteSize = transaction.chargeableByteSize();
  console.log('chargeableByteSize', chargeableByteSize);
  const bytesGas = bn(chargeableByteSize).mul(feeParams.gasPerByte); // 1824
  console.log('bytesGas', bytesGas.toString());
  const inputsGas = gasUsedByInputs(transaction.inputs, transaction.byteSize(), gasCosts); // 3256
  console.log('inputsGas', inputsGas.toString());

  let metadataGas = bn(0); // 4
  const tx = transaction.toTransaction();
  if (tx.type === TransactionType.Script) {
    metadataGas = resolveGasDependentCosts(transaction.byteSize(), gasCosts.s256);
  }
  console.log('metadataGas', metadataGas.toString());

  return vmInitGas.add(bytesGas).add(inputsGas).add(metadataGas).maxU64();
}
