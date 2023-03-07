/* eslint-disable no-restricted-syntax */

import { logSection } from '../log';
import type { ContractsConfig } from '../types';

import { buildContract } from './forc/buildContract';
import { buildTypes } from './typegen/buildTypes';

export async function buildContracts(config: ContractsConfig) {
  if (!config.workspace) {
    logSection('🧰 Building contracts using Forc...');
    for (const { path } of config.contracts) {
      await buildContract(path);
    }
  } else {
    logSection('🧰 Building workspace using Forc...');
    await buildContract(config.workspace);
  }
  await buildTypes(config);
}
