import { readFileSync } from 'fs';
import { join } from 'path';

export enum SnippetContractEnum {
  COUNTER = 'counter',
  SUM_SCRIPT = 'sum-script',
  ECHO_VALUES = 'echo-values',
  RETURN_CONTEXT = 'return-context',
  LOG_VALUES = 'log-values',
  SIMPLE_TOKEN = 'simple-token',
  TOKEN_DEPOSITOR = 'token-depositor',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  ECHO_CONFIGURABLES = 'echo-configurables',
  WHITELISTED_ADDRESS_PREDICATE = 'whitelisted-address-predicate',
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
