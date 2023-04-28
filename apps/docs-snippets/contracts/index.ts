import { readFileSync } from 'fs';
import { join } from 'path';

export enum SnippetContractEnum {
  COUNTER = 'counter',
  LOG_VALUES = 'log-values',
  ECHO_VALUES = 'echo-values',
  SIMPLE_TOKEN = 'simple-token',
  RETURN_CONTEXT = 'return-context',
  TOKEN_DEPOSITOR = 'token-depositor',
  ECHO_U64_ARRAY = 'echo-u64-array',
  ECHO_EMPLOYEE_DATA_VECTOR = 'echo-employee-data-vector',
}

const getSnippetContractPath = (contract: SnippetContractEnum) =>
  join(__dirname, contract, 'out', 'debug');

const getSnippetContractAbiPath = (contract: SnippetContractEnum) =>
  join(getSnippetContractPath(contract), `${contract}-abi.json`);

const getSnippetContractBinPath = (contract: SnippetContractEnum) =>
  join(getSnippetContractPath(contract), `${contract}.bin`);

export const getSnippetContractArtifacts = (contract: SnippetContractEnum) => {
  const abi = JSON.parse(readFileSync(getSnippetContractAbiPath(contract), 'utf-8'));
  const bin = readFileSync(getSnippetContractBinPath(contract));

  return {
    abi,
    bin,
  };
};
