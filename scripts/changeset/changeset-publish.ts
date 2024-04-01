import { execSync } from 'child_process';

const TAG_NAME = process.argv[2];
execSync(`pnpm changeset publish --no-git-tag --tag latest-release`);
execSync(`git tag -d ${TAG_NAME}`);
