import * as core from '@actions/core';
import * as github from '@actions/github';

// @ts-expect-error cant import ts in mts
import {getFullChangelog} from './get-full-changelog.mts';

await (async () => {
  const { PUBLISHED, GITHUB_REPOSITORY, GITHUB_TOKEN, RELEASE_TAG } = process.env;
  
  if (!GITHUB_TOKEN) {
    core.setFailed('Please add GITHUB_TOKEN to the environment');
    return;
  }

  if (['true', 'false'].indexOf(PUBLISHED ?? '') === -1) {
    core.setFailed('Please add PUBLISHED to the environment. Valid values are: true, false');
    return;
  }

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const changelog = await getFullChangelog(octokit);
  
  if (PUBLISHED === 'false') {
    // update changesets PR body
    const searchQuery = `repo:${GITHUB_REPOSITORY}+state:open+head:changeset-release/master+base:master`;
    const searchResult = await octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
    });

    const pr = searchResult.data.items[0];

    await octokit.rest.pulls.update({
      ...github.context.repo,
      pull_number: pr.number,
      body: changelog,
    });
    return;
  }

  if (PUBLISHED === 'true') {
    // update release's body
    if (!RELEASE_TAG) {
      core.setFailed('Please add RELEASE_TAG to the environment');
      return;
    }

    const release = await octokit.rest.repos.getReleaseByTag({
      ...github.context.repo,
      tag: RELEASE_TAG,
    });

    await octokit.rest.repos.updateRelease({
      ...github.context.repo,
      release_id: release.data.id,
      body: changelog,
    });
  }
})();
