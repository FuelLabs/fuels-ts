import type { Account, Provider } from 'fuels';

import type { TransferContract } from '../../test/typegen/contracts';

export type MeasureResponse<T> = {
  duration: number;
  response: T;
};

export enum TagEnum {
  Script = 'script',
  SimpleTransfer = 'simple-transfer',
  ScriptWithPredicate = 'script-with-predicate',
  MissingOutputVariable = 'missing-output-variable',
  Missing4xOutputVariable = 'missing-4x-output-variable',
}

export type OperationResult<T = unknown> = T;

export type PerformanceOperationParams = {
  account: Account;
  baseAssetId: string;
  provider: Provider;
  contract: TransferContract;
};

export type PerformanceResult = {
  tag: TagEnum;
  duration: number;
};

export type Operation = {
  tag: TagEnum;
  operation: (params: PerformanceOperationParams) => Promise<OperationResult>;
  preparatorySteps?: (params: PerformanceOperationParams) => Promise<void>;
};
