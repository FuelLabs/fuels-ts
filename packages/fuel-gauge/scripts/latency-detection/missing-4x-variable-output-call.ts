import { measure } from './helpers';
import type { BaseParams, PerformanceResult } from './types';
import { TagEnum } from './types';

export async function missing4xOutputVariableCall(params: BaseParams): Promise<PerformanceResult> {
  const { account, baseAssetId, contract } = params;

  const callParams = [
    {
      recipient: { Address: { bits: account.address.toB256() } },
      asset_id: { bits: baseAssetId },
      amount: 25,
    },
    {
      recipient: { Address: { bits: account.address.toB256() } },
      asset_id: { bits: baseAssetId },
      amount: 25,
    },
    {
      recipient: { Address: { bits: account.address.toB256() } },
      asset_id: { bits: baseAssetId },
      amount: 25,
    },
    {
      recipient: { Address: { bits: account.address.toB256() } },
      asset_id: { bits: baseAssetId },
      amount: 25,
    },
  ];

  const { duration } = await measure(async () => {
    const call = await contract.functions
      .execute_transfer(callParams)
      .callParams({ forward: [1000, baseAssetId] })
      .call();

    return call.waitForResult();
  });

  return { tag: TagEnum.Missing4xOutputVariable, duration };
}
