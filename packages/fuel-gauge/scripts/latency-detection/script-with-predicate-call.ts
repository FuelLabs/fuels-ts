import { measure } from './helpers';
import type { PerformanceOperationParams, PerformanceResult } from './types';
import { TagEnum } from './types';

export async function scriptWithPredicateCall(
  params: PerformanceOperationParams
): Promise<PerformanceResult> {
  const { baseAssetId, contract, callParams, predicate } = params;

  const { duration } = await measure(async () => {
    contract.account = predicate;
    const call = await contract.functions
      .execute_transfer(callParams)
      .txParams({ variableOutputs: 1 })
      .callParams({ forward: [100, baseAssetId] })
      .call();

    return call.waitForResult();
  });

  return { tag: TagEnum.ScriptWithPredicate, duration };
}
