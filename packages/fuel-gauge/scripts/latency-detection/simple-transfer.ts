import {
  TagEnum,
  type Operation,
  type OperationResult,
  type PerformanceOperationParams,
} from './types';

export async function operation(params: PerformanceOperationParams): Promise<OperationResult> {
  const { baseAssetId, account } = params;

  const transfer = await account.transfer(account.address, 1000, baseAssetId);
  return transfer.waitForResult();
}

export const simpleTransfer: Operation = {
  tag: TagEnum.SimpleTransfer,
  operation,
};
