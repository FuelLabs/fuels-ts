/* eslint-disable no-restricted-syntax */

import type { ContractsConfig } from '../types';

import { buildContract } from './forc/buildContract';
import { buildTypes } from './typegen/buildTypes';

export async function buildContracts(config: ContractsConfig) {
  for (const { path } of config.contracts) {
    await buildContract(path);
  }
  await buildTypes(config);
}
