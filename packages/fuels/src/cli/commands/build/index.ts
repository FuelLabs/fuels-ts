import type { ParsedFuelsConfig } from '../../types';
import { logSection } from '../../utils';

import { buildSwayPrograms } from './buildSwayPrograms';
import { generateTypes } from './generateTypes';

export async function build(config: ParsedFuelsConfig) {
  logSection('Building..');
  await buildSwayPrograms(config);
  await generateTypes(config);
}
