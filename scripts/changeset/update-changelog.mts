import * as core from "@actions/core";
import * as github from "@actions/github";
import { getInfo } from "@changesets/get-github-info";
import { execSync } from "child_process";

import { getFullChangelog } from "./get-full-changelog.mts";

await (async () => {

  const { PUBLISHED, GITHUB_REPOSITORY, GITHUB_TOKEN, RELEASE_TAG, REF_NAME } =
    process.env;

  
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

  if (PUBLISHED === "false") {
    // update changesets PR body
    const searchQuery = `repo:${GITHUB_REPOSITORY}+state:open+head:changeset-release/${REF_NAME}+base:${REF_NAME}`;
    const searchResult = await octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
    });

    const pr = searchResult.data.items[0];

    const changelog = await getFullChangelog(octokit);

    await octokit.rest.pulls.update({
      ...github.context.repo,
      pull_number: pr.number,
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

    const release = await octokit.rest.repos.getReleaseByTag({
      ...github.context.repo,
      tag: RELEASE_TAG,
    });

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
})();
