import { readFileSync } from 'fs';
import { join } from 'path';

export enum SnippetContractEnum {
  ECHO_VALUES = 'echo-values',
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
