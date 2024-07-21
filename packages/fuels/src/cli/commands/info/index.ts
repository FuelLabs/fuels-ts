import { type Command } from 'commander';

import { log } from '../../utils/logger';

import { snapshot } from './snapshot';

export function runInfo(_program: Command) {
  log(JSON.stringify(snapshot, null, 2));
}
