import type { Command } from 'commander';

import type { Commands } from '../types';

export function withProgram<CType extends Commands>(
  program: Command,
  command: CType,
  fn: (program: Command) => void
) {
  return async () => {
    await fn(program);
  };
}
