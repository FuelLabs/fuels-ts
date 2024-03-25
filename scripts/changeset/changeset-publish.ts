import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const changesetPath = path.join(process.cwd(), '.changeset', 'config.json');
const changesetConfig = JSON.parse(readFileSync(changesetPath, 'utf-8')) as { baseBranch: string };

/**
 * Update the base branch in the changeset config file to ensure that the changeset is published based on the correct branch.
 * This is necessary because we publish both from the master and release/* branches.
 * https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#basebranch-git-branch-name
 */
const currentBranchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
changesetConfig.baseBranch = currentBranchName;

writeFileSync(changesetPath, JSON.stringify(changesetConfig, null, 2), 'utf-8');

execSync('changeset publish --no-git-tag', { stdio: 'inherit' });
