import { PredicateWithConfigurable } from '../../test/typegen/predicates';

import {
  TagEnum,
  type Operation,
  type OperationResult,
  type PerformanceOperationParams,
} from './types';

let predicate: PredicateWithConfigurable;

// let callParams;

const preparatorySteps = async (params: PerformanceOperationParams) => {
  const { account, provider, baseAssetId } = params;

  // Instantiating predicate
  predicate = new PredicateWithConfigurable({
    provider,
    data: [10, account.address.toString()],
    configurableConstants: {
      ADDRESS: account.address.toString(),
      FEE: 10,
    },
  });

  // Funding predicate
  const res = await account.transfer(predicate.address, 3000, baseAssetId);
  await res.waitForResult();
};

async function operation(params: PerformanceOperationParams): Promise<OperationResult> {
  const { account, baseAssetId, contract } = params;

  const callParams = [
    {
      recipient: { Address: { bits: account.address.toB256() } },
      asset_id: { bits: baseAssetId },
      amount: 100,
    },
  ];

  contract.account = predicate;
  const call = await contract.functions
    .execute_transfer(callParams)
    .txParams({ variableOutputs: 1 })
    .callParams({ forward: [100, baseAssetId] })
    .call();

  return call.waitForResult();
}

export const scriptWithPredicateCall: Operation = {
  tag: TagEnum.ScriptWithPredicate,
  operation,
  preparatorySteps,
};
