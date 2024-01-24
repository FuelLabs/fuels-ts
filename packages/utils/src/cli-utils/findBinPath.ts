import { existsSync } from 'fs';
import { join } from 'path';

export const findBinPath = (binCommandName: string, startingDir: string): string => {
  const cmdPath = join(startingDir, 'node_modules', '.bin', binCommandName);
  const parentDir = join(startingDir, '..');

  if (existsSync(cmdPath)) {
    return cmdPath;
  }

  if (parentDir === startingDir) {
    throw new Error(`Command not found: ${binCommandName}`);
  }

  return findBinPath(binCommandName, parentDir);
};
