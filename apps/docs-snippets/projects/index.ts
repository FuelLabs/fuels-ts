import { readFileSync } from 'fs';
import { join } from 'path';

export enum SnippetProjectEnum {
  COUNTER = 'counter',
  LOG_VALUES = 'log-values',
  SUM_SCRIPT = 'sum-script',
  ECHO_VALUES = 'echo-values',
  SIMPLE_TOKEN = 'simple-token',
  RETURN_CONTEXT = 'return-context',
  TOKEN_DEPOSITOR = 'token-depositor',
  ECHO_CONFIGURABLES = 'echo-configurables',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  WHITELISTED_ADDRESS_PREDICATE = 'whitelisted-address-predicate',
}

const getSnippetContractPath = (project: SnippetProjectEnum) =>
  join(__dirname, project, 'out', 'debug');

const getSnippetContractAbiPath = (project: SnippetProjectEnum) =>
  join(getSnippetContractPath(project), `${project}-abi.json`);

const getSnippetContractBinPath = (project: SnippetProjectEnum) =>
  join(getSnippetContractPath(project), `${project}.bin`);

export const getSnippetContractArtifacts = (project: SnippetProjectEnum) => {
  const abi = JSON.parse(readFileSync(getSnippetContractAbiPath(project), 'utf-8'));
  const bin = readFileSync(getSnippetContractBinPath(project));

  return {
    abi,
    bin,
  };
};
