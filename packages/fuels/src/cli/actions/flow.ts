import type { ParsedFuelsConfig } from '../types';

import { build } from './build';
import { deploy } from './deploy';
import { types } from './types';

export async function flow(config: ParsedFuelsConfig) {
  await build(config);
  const contracts = await deploy(config);
  await types(config);
  return contracts;
}
