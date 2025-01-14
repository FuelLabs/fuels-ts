import { measure } from './helpers';
import type { BaseParams, PerformanceResult } from './types';
import { TagEnum } from './types';

export async function missingOutputVariableCall(params: BaseParams): Promise<PerformanceResult> {
  const { baseAssetId, contract, callParams } = params;

  const { duration } = await measure(async () => {
    const call = await contract.functions
      .execute_transfer(callParams)
      .callParams({ forward: [100, baseAssetId] })
      .call();

    return call.waitForResult();
  });

  return { tag: TagEnum.MissingOutputVariable, duration };
}
