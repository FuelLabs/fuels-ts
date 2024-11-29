import { execSync } from 'child_process';

const TAG_NAME = process.argv[2];
const REF_NAME = process.argv[3];

const npmTag = REF_NAME === 'master' ? 'latest' : 'patch';

const changesetPublishOutput = execSync(
  `pnpm changeset publish --no-git-tag --tag ${npmTag}`
).toString();

// eslint-disable-next-line no-console
console.log(changesetPublishOutput); // print out as if execSync was run with stdio: "inherit"

// inspired by https://github.com/FuelLabs/changesets-action/blob/5866ff9f4cd625a76d86c0735aded055aeacf814/src/run.ts#L146
const publishSucceeded = changesetPublishOutput.includes(`published successfully`);

if (publishSucceeded) {
  /**
   * Tagging MUST be done after the branch is published so that the GitHub release is tied to the proper commit.
   * If this isn't done then the changesets workflow will always create a tag and release based off of the latest commit on the default branch (master).
   * That is okay if we're publishing master, but not okay if we're publishing a release/* branch.
   * In the case of patching old releases via release/* branches,
   * that would lead to mismatch between the actual published commit and the one referenced in the GitHub release.
   *
   * This is where the tagging would happen if we didn't tag it ourselves:
   * https://github.com/FuelLabs/changesets-action/blob/5866ff9f4cd625a76d86c0735aded055aeacf814/src/run.ts#L62
   */
  execSync(`git tag ${TAG_NAME}`);
}
