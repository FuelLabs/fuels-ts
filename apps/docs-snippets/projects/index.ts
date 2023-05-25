import { getForcProject } from '@fuel-ts/utils/test';
import type { JsonFlatAbi } from 'fuels';
import { join } from 'path';

export enum SnippetProjectEnum {
  COUNTER = 'counter',
  ECHO_ENUM = 'echo-enum',
  LOG_VALUES = 'log-values',
  SUM_SCRIPT = 'sum-script',
  ECHO_VALUES = 'echo-values',
  SIMPLE_TOKEN = 'simple-token',
  SUM_OPTION_U8 = 'sum-option-u8',
  ECHO_U64_ARRAY = 'echo-u64-array',
  RETURN_CONTEXT = 'return-context',
  TOKEN_DEPOSITOR = 'token-depositor',
  SIMPLE_PREDICATE = 'simple-predicate',
  ECHO_CONFIGURABLES = 'echo-configurables',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  RETURN_TRUE_PREDICATE = 'return-true-predicate',
  ECHO_EMPLOYEE_DATA_VECTOR = 'echo-employee-data-vector',
  WHITELISTED_ADDRESS_PREDICATE = 'whitelisted-address-predicate',
}

export const getSnippetProjectArtifacts = (project: SnippetProjectEnum) =>
  getForcProject<JsonFlatAbi>(join(__dirname, project));
