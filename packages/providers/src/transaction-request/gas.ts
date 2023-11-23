import { bn } from '@fuel-ts/math';
import { getBytesCopy } from 'ethers';

import type { GqlGasCosts } from '../__generated__/operations';
import type { ChainInfo } from '../provider';
import { resolveGasDependentCosts } from '../utils/gas';

import type { TransactionRequestInput } from './input';
import type { BaseTransactionRequest } from './transaction-request';

export function gasUsedByInputs(
  inputs: Array<TransactionRequestInput>,
  _txBytesSize: number, // TODO: this is going to change
  gasCosts: GqlGasCosts
) {
  const witnessCache: Array<number> = [];
  const totalGas = inputs.reduce((total, input) => {
    if ('predicate' in input && input.predicate) {
      return total.add(
        bn(gasCosts.vmInitialization)
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

export function getMinGas(transaction: BaseTransactionRequest, chainInfo: ChainInfo) {
  const {
    gasCosts,
    consensusParameters: { gasPerByte },
  } = chainInfo;
  const vmInitGas = bn(gasCosts.vmInitialization);
  const byteSize = transaction.byteSize();
  const bytesGas = bn(byteSize).mul(gasPerByte);
  const inputsGas = gasUsedByInputs(transaction.inputs, byteSize, gasCosts);
  const metadataGas = transaction.metadataGas(gasCosts);
  const minGas = vmInitGas.add(bytesGas).add(inputsGas).add(metadataGas).maxU64();
  return minGas;
}
