import { type Command } from 'commander';
import { dir } from 'console';

import { snapshot } from './snapshot';

export function runInfo(_program: Command) {
  dir(snapshot);
}
