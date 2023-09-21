import type { OptionValues } from 'commander';
import { resolve } from 'path';

export const resolveProjectCwd = (options: OptionValues) => {
  const cwd = resolve(process.cwd(), options.path || './');
  return cwd;
};
