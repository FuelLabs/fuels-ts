import { FuelError } from '@fuel-ts/errors';
import { versions } from '@fuel-ts/versions';
import { existsSync, readFileSync } from 'fs';
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
  // PNPM resolves to `node_modules/create-fuels/create-fuels.js`
  const inlinePackageJsonPath = join(basePath, 'package.json');
  // Bun resolves to `node_modules/.bin/create-fuels`
  const relativeBinPackageJsonPath = join(basePath, '..', 'create-fuels', 'package.json');

  let version: string;
  try {
    let path;
    if (existsSync(inlinePackageJsonPath)) {
      path = inlinePackageJsonPath;
    } else if (existsSync(relativeBinPackageJsonPath)) {
      path = relativeBinPackageJsonPath;
    } else {
      throw new FuelError(
        FuelError.CODES.PARSE_FAILED,
        `Unable to find package.json at ${inlinePackageJsonPath} or ${relativeBinPackageJsonPath}`
      );
    }

    const packageJson = readFileSync(path, 'utf8');
    version = JSON.parse(packageJson).version;
  } catch (error) {
    version = versions.FUELS;
  }

  return version;
};
