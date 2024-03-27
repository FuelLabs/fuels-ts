import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const changesetPath = path.join(process.cwd(), '.changeset', 'config.json');
const changesetConfig = JSON.parse(readFileSync(changesetPath, 'utf-8')) as { baseBranch: string };

const currentBranchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

/**
 * Update the base branch in the changeset config file to ensure that the changes are published based on the correct branch.
 * This is necessary because we publish both from the master and release/* branches.
 * https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#basebranch-git-branch-name
 */
if (changesetConfig.baseBranch !== currentBranchName) {
  execSync(
    `echo "updating baseBranch of .changeset/config.json from ${changesetConfig.baseBranch} to ${currentBranchName}"`
  );
  changesetConfig.baseBranch = currentBranchName;

  writeFileSync(changesetPath, JSON.stringify(changesetConfig, null, 2), 'utf-8');
  execSync(`git add .changeset/config.json`);
  execSync(`git commit -m"ci(scripts): update baseBranch of .changeset/config.json"`);
}
