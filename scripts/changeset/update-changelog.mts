import * as core from "@actions/core";
import * as github from "@actions/github";
import { getInfo } from "@changesets/get-github-info";
import { execSync } from "child_process";

import { getFullChangelog } from "./get-full-changelog.mts";

const {
  PUBLISHED,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  RELEASE_TAG,
  REF_NAME,
  LATEST_RELEASE,
  RELEASE_VERSION_HIGHER_THAN_LATEST,
} = process.env;

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

async function getChangesetPr(retried = false) {
  const octokit = github.getOctokit(GITHUB_TOKEN as string);
  const searchQuery = `repo:${GITHUB_REPOSITORY}+state:open+head:changeset-release/${REF_NAME}+base:${REF_NAME}`;
  const searchResult = await octokit.rest.search.issuesAndPullRequests({
    q: searchQuery,
  });

  let result = searchResult.data.items[0];

  if (!result && !retried) {
    /**
     * A workflow that generated a changeset PR still failed in this script:
     * https://github.com/FuelLabs/fuels-ts/actions/runs/8431124880/job/23088059451#step:9:24
     *
     * The same workflow passed when it was run later:
     * https://github.com/FuelLabs/fuels-ts/actions/runs/8431124880
     *
     * I can't attribute this to anything except GitHub services not syncing up fast enough behind the scenes.
     * That's why I added this sleep and retry mechanism.
     */
    await sleep(10000);
    result = await getChangesetPr(true);
  }

  return result;
}

/**
 * The changesets action always sets its release as latest even though semantically it might not be.
 * E.g. We have 0.80.0 which is the latest master and we release a patch for 0.68.1.
 * It'd tag 0.68.1 as the latest release on GitHub, which is not semantically correct.
 *
 * This code is reverting that change by reapplying the latest tag to the real latest release.
 *
 * This is the line where it creates the release:
 * https://github.com/FuelLabs/changesets-action/blob/5866ff9f4cd625a76d86c0735aded055aeacf814/src/run.ts#L62
 */
async function reapplyLatestTagToActualLatestRelease() {
  const octokit = github.getOctokit(GITHUB_TOKEN as string);

  const previousLatest = await octokit.rest.repos.getReleaseByTag({
    ...github.context.repo,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tag: LATEST_RELEASE!,
  });

  await octokit.rest.repos.updateRelease({
    ...github.context.repo,
    release_id: previousLatest.data.id,
    make_latest: "true",
  });
}

async function updatePublishedRelease() {
  const octokit = github.getOctokit(GITHUB_TOKEN as string);

  const release = await octokit.rest.repos.getReleaseByTag({
    ...github.context.repo,
    tag: RELEASE_TAG as string,
  });

  execSync("git fetch --tags");
  const commit = execSync(`git rev-list --no-walk ${RELEASE_TAG}`)
    .toString()
    .trim();

  const { pull } = await getInfo({
    repo: GITHUB_REPOSITORY as string,
    commit,
  });

  const pr = await octokit.rest.pulls.get({
    ...github.context.repo,
    pull_number: pull as number,
  });

  await octokit.rest.repos.updateRelease({
    ...github.context.repo,
    release_id: release.data.id,
    body: pr.data.body as string,
  });
}

await (async () => {
  if (!GITHUB_TOKEN) {
    core.setFailed("Please add GITHUB_TOKEN to the environment");
    return;
  }

  if (["true", "false"].indexOf(PUBLISHED ?? "") === -1) {
    core.setFailed(
      "Please add PUBLISHED to the environment. Valid values are: true, false",
    );
    return;
  }

  execSync(`git checkout ${REF_NAME}`);

  const octokit = github.getOctokit(GITHUB_TOKEN);

  // update changesets PR body
  if (PUBLISHED === "false") {
    const changesetPr = await getChangesetPr();

    if (!changesetPr) {
      /**
       * Changeset PRs don't get created when there are no changesets.
       * Example PR without a changeset: https://github.com/FuelLabs/fuels-ts/pull/1939
       * It got merged into master right after a publishing of master (so there's a clean changeset slate).
       * It doesn't have a changeset and caused an issue in the CI:
       * https://github.com/FuelLabs/fuels-ts/actions/runs/8421817249/job/23059607346#step:9:24
       * That's why this return statement was added.
       */
      execSync('echo "Did not find changeset PR..."', { stdio: "inherit" });
      return;
    }

    const changelog = await getFullChangelog(octokit);

    await octokit.rest.pulls.update({
      ...github.context.repo,
      pull_number: changesetPr.number,
      body: changelog,
    });
    return;
  }

  if (PUBLISHED === "true") {
    // update release's body
    if (!RELEASE_TAG) {
      core.setFailed("Please add RELEASE_TAG to the environment");
      return;
    }

    if (RELEASE_VERSION_HIGHER_THAN_LATEST !== "true") {
      await reapplyLatestTagToActualLatestRelease();
    }

    await updatePublishedRelease();
  }
})();
