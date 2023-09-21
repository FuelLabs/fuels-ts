import { existsSync } from 'fs';
import { join } from 'path';

export function findPackageRoot(currentDir: string = __dirname) {
  if (existsSync(join(currentDir, 'package.json'))) {
    return currentDir;
  }
  return findPackageRoot(join(currentDir, '..'));
}
