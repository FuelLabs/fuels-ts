/* eslint-disable no-restricted-syntax */
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import sh from 'shelljs';

export const resolveDir = (dir: string) => path.resolve(process.cwd(), dir);

function changePkgJsonVersion(dir: string, version: string) {
  const filepath = path.join(dir, 'package.json');
  const pkgJsonPath = resolveDir(filepath);
  const pkgJson = fs.readJsonSync(pkgJsonPath);
  pkgJson.version = version;
  fs.outputJSONSync(pkgJsonPath, pkgJson);
  sh.exec(`pnpm prettier --write ${filepath} --loglevel=silent`);
}

export async function changeAllPkgJSON(version: string) {
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);
  const spinner = ora('Bumping versions').start();

  for (const dir of dirs) {
    if (!dir.includes('forc-bin')) {
      changePkgJsonVersion(`./packages/${dir}`, version);
    }
  }

  spinner.succeed();
  changePkgJsonVersion('./', version);
}

export async function deleteMasterReleases() {
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);

  for (const dir of dirs) {
    try {
      const filepath = path.join(dir, 'package.json');
      const pkgJsonPath = resolveDir(filepath);
      const pkgJson = fs.readJsonSync(pkgJsonPath);
      sh.exec(`npm dist-tag rm ${pkgJson.name} master`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
