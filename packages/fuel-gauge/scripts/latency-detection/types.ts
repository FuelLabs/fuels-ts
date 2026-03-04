import type { Account, Provider } from 'fuels';

export type MeasureResponse<T> = {
  duration: number;
  response: T;
};

export enum TagEnum {
  SimpleTransfer = 'simple-transfer',
  PredicateSignatureValidation = 'predicate-signature-validation',
  Missing4xOutputVariable = 'missing-4x-output-variable',
  InterContractCall = 'inter-contract-call',
}

export type OperationResult<T = unknown> = T;

export type PerformanceOperationParams = {
  account: Account;
  baseAssetId: string;
  provider: Provider;
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

export enum ContractEnum {
  TransferContract = 'transfer-contract',
  LogContract = 'log-contract',
  AdvancedLogContract = 'advanced-log-contract',
}
