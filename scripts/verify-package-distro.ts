import { execSync } from 'child_process';
import { log, error } from 'console';
import { readFileSync } from 'fs';
import { globSync } from 'glob';
import { dirname, join } from 'path';

/**
 * Requires `@arethetypeswrong/cli` installed globally
 * 
 * ```console
 * npm i -g @arethetypeswrong/cli
 * ```
 */
interface PackageJson {
  name: string;
  private: boolean;
  exports: Record<string, {
    require: string;
    import: string;
  }>
}

/**
 * Get only the package's with exports
 */
const packagesWithExports = globSync(`{packages,apps}/*/package.json`)
  .map((path) => {
    const pkgJson = JSON.parse(readFileSync(path, 'utf-8')) as PackageJson;
    return { ...pkgJson, path: dirname(path) };
  })
  .filter((json) => !json.private && json.exports)

let errorCode = 0;

/**
 * 1). Verify that each package can be packed and types are correct
 */
packagesWithExports.forEach((pkg) => {
  try {
    const result = execSync(`attw ${pkg.path} --pack`);
    log(result.toString());
  } catch (e) {
    error(`Error | Package export types`);
    error(pkg.path)
    error(e);
    errorCode = 1;
  }
})

/**
 * 2). Verify that each package can be packed and types are correct
 */
Object
  .values(packagesWithExports)
  .flatMap(pkg => Object
      .values(pkg.exports)
      .flatMap((e) => [e.require, e.import])
      .map((entrypoint) => join(pkg.path, entrypoint))
  )
  .forEach(entrypoint => {
    try {
      execSync(`node ${entrypoint}`)
      log(entrypoint)
    } catch (e) {
      error(`Error | Package export types`);
      error(entrypoint)
      error(e.toString());
      errorCode = 1;
    }
  })

process.exit(errorCode);