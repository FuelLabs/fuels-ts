import fs from 'fs-extra';
import ora from 'ora';
import sh from 'shelljs';

import { resolveDir } from './changePackages';

const chglog = '"$PWD":/workdir quay.io/git-chglog/git-chglog';

function execChgLog(args: string, nextVersion: string) {
  return new Promise((resolve) => {
    sh.exec(`docker run -v ${chglog} ${args} --next-tag ${nextVersion}`, { silent: true }, () => {
      resolve(null);
    });
  });
}

export async function generateChangelogs(nextVersion: string) {
  const pkgsDir = resolveDir('./packages');
  const dirs = await fs.readdir(pkgsDir);

  sh.exec('docker pull quay.io/git-chglog/git-chglog:latest', { silent: true });
  await execChgLog('-o ./CHANGELOG.md', nextVersion);

  await Promise.all(
    dirs.map(async (dir, idx) => {
      setTimeout(async () => {
        const spinner = ora(`Updating changelog: ${dir}`).start();
        const args = `-o ./packages/${dir}/CHANGELOG.md --path ./packages/${dir}`;
        await execChgLog(args, nextVersion);
        spinner.succeed(`Changelog updated for ${dir}`);
      }, idx * 50);
    })
  );
}
