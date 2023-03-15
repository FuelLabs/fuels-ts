import type { LoadedConfig } from '../types';

import { build } from './build';
import { deploy } from './deploy';
import { types } from './types';

export async function run(config: LoadedConfig) {
  await build(config);
  const contracts = await deploy(config);
  await types(config);
  return contracts;
}
