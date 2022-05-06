/* eslint-disable no-restricted-syntax */
import fs from 'fs-extra';
import path from 'path';
import sh from 'shelljs';

export const resolveDir = (dir: string) => path.resolve(process.cwd(), dir);

export async function changeAllPkgJSON(version: string, registry?: string) {
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);

  for (const dir of dirs) {
    const pkgJsonPath = resolveDir(`./packages/${dir}/package.json`);
    let pkgJson = fs.readJsonSync(pkgJsonPath);

    if (registry) {
      pkgJson.publishConfig = {
        ...(pkgJson.publishConfig || {}),
        registry,
      };
    }

    pkgJson.version = version;
    pkgJson = JSON.parse(JSON.stringify(pkgJson).replace(/workspace:\*/g, version));
    fs.outputJSONSync(pkgJsonPath, pkgJson);
  }

  sh.exec('pnpm prettier --write ./packages/**/package.json --loglevel=silent');
}

function getAllPackages() {
  const pkgsDir = resolveDir('./packages');
  const dirs = fs.readdirSync(pkgsDir);
  return dirs.map((dir) => {
    const pkgJsonPath = resolveDir(`./packages/${dir}/package.json`);
    return fs.readJSONSync(pkgJsonPath).name as string;
  });
}

function changeWorkspaceDependencies(deps: Record<string, string>) {
  const packages = getAllPackages();
  return Object.entries(deps).reduce((obj, [key, val]) => {
    const isWorkspacePackage = packages.some((pkg) => pkg === key);
    return { ...obj, [key]: isWorkspacePackage ? 'workspace:*' : val };
  }, {});
}

export async function restorePkgJson() {
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);

  for (const dir of dirs) {
    const pkgJsonPath = resolveDir(`./packages/${dir}/package.json`);
    const pkgJson = await fs.readJSON(pkgJsonPath);
    const deps = pkgJson.dependencies;
    const devDeps = pkgJson.devDependencies;
    const newPkgJson = {
      ...pkgJson,
      ...(deps && { dependencies: changeWorkspaceDependencies(deps) }),
      ...(devDeps && { devDependencies: changeWorkspaceDependencies(devDeps) }),
    };

    fs.outputJSONSync(pkgJsonPath, newPkgJson);
  }

  sh.exec('pnpm prettier --write ./packages/**/package.json --loglevel=silent');
}
