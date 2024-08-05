import type { JsonAbi } from 'fuels';
import { getForcProject } from 'fuels/test-utils';
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
  RETURN_SCRIPT = 'return-script',
  TOKEN_DEPOSITOR = 'token-depositor',
  TOKEN = 'token',
  LIQUIDITY_POOL = 'liquidity-pool',
  SIMPLE_PREDICATE = 'simple-predicate',
  ECHO_CONFIGURABLES = 'echo-configurables',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  RETURN_TRUE_PREDICATE = 'return-true-predicate',
  ECHO_EMPLOYEE_DATA_VECTOR = 'echo-employee-data-vector',
  WHITELISTED_ADDRESS_PREDICATE = 'whitelisted-address-predicate',
  ECHO_EVM_ADDRESS = 'echo-evm-address',
  ECHO_BYTES = 'echo-bytes',
  ECHO_RAW_SLICE = 'echo-raw-slice',
  ECHO_STD_STRING = 'echo-std-string',
  ECHO_ASSET_ID = 'echo-asset-id',
  SCRIPT_TRANSFER_TO_CONTRACT = 'script-transfer-to-contract',
  REVERT_ERRORS = 'revert-errors',
  REVERT_ERRORS_SCRIPT = 'revert-errors-script',
  PREDICATE_SIGNING = 'predicate-signing',
  SCRIPT_SIGNING = 'script-signing',
  INPUT_OUTPUT_TYPES = 'input-output-types',
  BYTECODE_INPUT = 'bytecode-input',
}

export const getDocsSnippetsForcProject = (project: DocSnippetProjectsEnum) =>
  getForcProject<JsonAbi>({
    projectDir: join(__dirname, project),
    projectName: project,
    build: 'release',
  });
