import { versions } from '@fuel-ts/versions';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';

/**
 * Get the current version from the create fuels package.json
 *
 * @param args - process.argv
 * @returns the version of the create fuels package
 */
export const getPackageVersion = (args: string[]): string => {
  const [, execPath] = args;

  const basePath = dirname(execPath);
  const packageJsonPath = join(basePath, 'package.json');

  let version: string;
  try {
    const packageJson = readFileSync(packageJsonPath, 'utf8');
    version = JSON.parse(packageJson).version;
  } catch (error) {
    version = versions.FUELS;
  }

  return version;
};
