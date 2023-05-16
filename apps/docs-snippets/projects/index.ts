import { readFileSync } from 'fs';
import { join } from 'path';

export enum SnippetProjectEnum {
  COUNTER = 'counter',
  ECHO_VALUES = 'echo-values',
  RETURN_CONTEXT = 'return-context',
  LOG_VALUES = 'log-values',
  SIMPLE_TOKEN = 'simple-token',
  TOKEN_DEPOSITOR = 'token-depositor',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  ECHO_CONFIGURABLES = 'echo-configurables',
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
