import {
  TagEnum,
  type Operation,
  type OperationResult,
  type PerformanceOperationParams,
} from './types';

async function operation(params: PerformanceOperationParams): Promise<OperationResult> {
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

  const call = await contract.functions
    .execute_transfer(callParams)
    .callParams({ forward: [1000, baseAssetId] })
    .call();

  return call.waitForResult();
}

export const missing4xOutputVariableCall: Operation = {
  tag: TagEnum.Missing4xOutputVariable,
  operation,
};
