import { readFileSync } from 'fs';
import { basename, join } from 'path';

export function getPackageRootDir() {
  let rootDir: string | undefined;

  let dirPath = __dirname;

  do {
    dirPath = join(dirPath, '..');
    const dirName = basename(dirPath);
    if (dirName === 'abi-typegen') {
      rootDir = dirPath;
    }
  } while (rootDir === undefined);

  return rootDir;
}

export function getPackageVersion() {
  const packagePath = join(getPackageRootDir(), 'package.json');
  const packageJson = readFileSync(packagePath, 'utf8');
  const { version } = JSON.parse(packageJson);
  return { version };
}
