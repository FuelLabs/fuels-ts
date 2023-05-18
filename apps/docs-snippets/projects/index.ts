import { getForcProject } from '@fuel-ts/utils/test';
import type { JsonFlatAbi } from 'fuels';
import { join } from 'path';

export enum SnippetProjectEnum {
  COUNTER = 'counter',
  SUM_SCRIPT = 'sum-script',
  LOG_VALUES = 'log-values',
  ECHO_VALUES = 'echo-values',
  SIMPLE_TOKEN = 'simple-token',
  RETURN_CONTEXT = 'return-context',
  TOKEN_DEPOSITOR = 'token-depositor',
  ECHO_CONFIGURABLES = 'echo-configurables',
  TRANSFER_TO_ADDRESS = 'transfer-to-address',
  WHITELISTED_ADDRESS_PREDICATE = 'whitelisted-address-predicate',
}

export const getSnippetProjectArtifacts = (project: SnippetProjectEnum) =>
  getForcProject<JsonFlatAbi>(join(__dirname, project));
