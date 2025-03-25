import {
  TagEnum,
  type Operation,
  type OperationResult,
  type PerformanceOperationParams,
} from './types';

async function operation(params: PerformanceOperationParams): Promise<OperationResult> {
  const { baseAssetId, contract, account } = params;

  const callParams = [
    {
      recipient: { Address: { bits: account.address.toB256() } },
      asset_id: { bits: baseAssetId },
      amount: 100,
    },
  ];

  const call = await contract.functions
    .execute_transfer(callParams)
    .callParams({ forward: [100, baseAssetId] })
    .call();

  return call.waitForResult();
}

export const missingOutputVariableCall: Operation = {
  tag: TagEnum.MissingOutputVariable,
  operation,
};
