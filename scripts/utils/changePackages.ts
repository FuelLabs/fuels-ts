/* eslint-disable no-restricted-syntax */
import fs from 'fs-extra';
import path from 'path';
import sh from 'shelljs';

export const resolveDir = (dir: string) => path.resolve(process.cwd(), dir);
const filesMap = new Map();

export async function changeAllPkgJSON(version: string, registry?: string) {
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);

  for (const dir of dirs) {
    const pkgJsonPath = resolveDir(`./packages/${dir}/package.json`);
    let pkgJson = fs.readJsonSync(pkgJsonPath);
    filesMap.set(pkgJsonPath, { ...pkgJson });

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

export async function restorePkgJson(useLernaVersion?: boolean) {
  const lernaJSON = await fs.readJSON(resolveDir('./lerna.json'));
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);

  for (const dir of dirs) {
    const pkgJsonPath = resolveDir(`./packages/${dir}/package.json`);
    const pkgJson = filesMap.get(pkgJsonPath);

    if (useLernaVersion) {
      pkgJson.version = lernaJSON.version;
    }
    fs.outputJSONSync(pkgJsonPath, pkgJson);
  }

  sh.exec('pnpm prettier --write ./packages/**/package.json --loglevel=silent');
}
