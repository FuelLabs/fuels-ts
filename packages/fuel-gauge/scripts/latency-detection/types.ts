import type { Account, Provider } from 'fuels';

import type { TransferContract } from '../../test/typegen/contracts';
import type { TransferParamsInputInput } from '../../test/typegen/contracts/TransferContract';
import type { Vec } from '../../test/typegen/contracts/common';
import type { PredicateWithConfigurable } from '../../test/typegen/predicates';

export type MeasureResponse<T> = {
  duration: number;
  response: T;
};

export enum TagEnum {
  Script = 'script',
  ScriptWithPredicate = 'script-with-predicate',
  MissingOutputVariable = 'missing-output-variable',
  Missing4xOutputVariable = 'missing-4x-output-variable',
}

export type BaseParams = {
  account: Account;
  baseAssetId: string;
  providerUrl: string;
  provider: Provider;
  contract: TransferContract;
  callParams: Vec<TransferParamsInputInput>;
  predicate: PredicateWithConfigurable;
};

export type PerformanceResult = {
  tag: TagEnum;
  duration: number;
};
