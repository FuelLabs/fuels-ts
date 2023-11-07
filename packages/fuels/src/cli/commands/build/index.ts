import type { FuelsConfig } from '../../types';
import { log } from '../../utils/logger';

import { buildSwayPrograms } from './buildSwayPrograms';
import { generateTypes } from './generateTypes';

export async function build(config: FuelsConfig) {
  log('Building..');
  await buildSwayPrograms(config);
  await generateTypes(config);
}
