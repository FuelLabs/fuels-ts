/* eslint-disable no-restricted-syntax */

import type { ContractsConfig } from 'src/types';

import { buildContract } from './buildContract';
import { buildTypes } from './buildTypes';

export async function buildContracts(config: ContractsConfig) {
  for (const { path } of config.contracts) {
    await buildContract(path);
  }
  await buildTypes(config);
}
