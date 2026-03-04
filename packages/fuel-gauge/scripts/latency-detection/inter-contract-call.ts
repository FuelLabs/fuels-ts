import { ScriptCallLoggingContracts } from '../../test/typegen/scripts';

import { getContractId } from './helpers';
import {
  ContractEnum,
  TagEnum,
  type Operation,
  type OperationResult,
  type PerformanceOperationParams,
} from './types';

export async function operation(params: PerformanceOperationParams): Promise<OperationResult> {
  const { account } = params;

  const contractA = getContractId(ContractEnum.LogContract);
  const contractB = getContractId(ContractEnum.AdvancedLogContract);

  const script = new ScriptCallLoggingContracts(account);

  const { waitForResult } = await script.functions.main(contractA, contractB).call();
  return waitForResult();
}

export const interContractCall: Operation = {
  tag: TagEnum.InterContractCall,
  operation,
};
