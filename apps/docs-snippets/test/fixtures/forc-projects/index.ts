import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { JsonAbi } from 'fuels';
import { join } from 'path';

export enum DocSnippetProjectsEnum {
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
  COMPLEX_PREDICATE = 'complex-predicate',
  COMPLEX_SCRIPT = 'complex-script',
  ECHO_CONFIGURABLES = 'echo-configurables',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  RETURN_TRUE_PREDICATE = 'return-true-predicate',
  ECHO_EMPLOYEE_DATA_VECTOR = 'echo-employee-data-vector',
  WHITELISTED_ADDRESS_PREDICATE = 'whitelisted-address-predicate',
  ECHO_EVM_ADDRESS = 'echo-evm-address',
  ECHO_BYTES = 'echo-bytes',
  ECHO_RAW_SLICE = 'echo-raw-slice',
  ECHO_STD_STRING = 'echo-std-string',
  SCRIPT_TRANSFER_TO_CONTRACT = 'script-transfer-to-contract',
}

export const getDocsSnippetsForcProject = (project: DocSnippetProjectsEnum) =>
  getForcProject<JsonAbi>({
    projectDir: join(__dirname, project),
    projectName: project,
  });
