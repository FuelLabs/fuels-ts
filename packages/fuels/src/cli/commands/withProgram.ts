import type { Command } from 'commander';

import type { Commands } from '../types';
import { error } from '../utils/logger';

export function withProgram<CType extends Commands>(
  program: Command,
  _command: CType,
  fn: (program: Command) => void
) {
  return async () => {
    try {
      await fn(program);
    } catch (err) {
      error(err);
    }
  };
}
