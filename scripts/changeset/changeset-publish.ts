import { execSync } from 'child_process';

const TAG_NAME = process.argv[2];
const changesetPublishOutput = execSync(
  `pnpm changeset publish --no-git-tag --tag testing-release`
).toString();

console.log(changesetPublishOutput);

const publishedSucceed = changesetPublishOutput.includes(`published successfully`);

if (publishedSucceed) {
  execSync(`git tag ${TAG_NAME}`);
}
