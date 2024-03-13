import * as core from '@actions/core';
import * as github from '@actions/github';

import { getFullChangelog } from './get-full-changelog';

process.env.GITHUB_REPOSITORY = 'FuelLabs/fuels-ts';
await (async () => {
  if (!process.env.GITHUB_TOKEN) {
    core.setFailed('Please add GITHUB_TOKEN to the environment');
    return;
  }

  if (['true', 'false'].indexOf(process.env.PUBLISHED ?? '') === -1) {
    core.setFailed('Please add PUBLISHED to the environment. Valid values are: true, false');
    return;
  }

  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

  const changelog = await getFullChangelog(octokit);

  if (process.env.PUBLISHED === 'false') {
    // update changesets PR body
    const searchQuery = `repo:${process.env.GITHUB_REPOSITORY}+state:open+head:changeset-release/master+base:master`;
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

  if (process.env.PUBLISHED === 'true') {
    // update release's body
    if (!process.env.RELEASE_TAG) {
      core.setFailed('Please add RELEASE_TAG to the environment');
      return;
    }

    const release = await octokit.rest.repos.getReleaseByTag({
      ...github.context.repo,
      tag: process.env.RELEASE_TAG,
    });

    await octokit.rest.repos.updateRelease({
      ...github.context.repo,
      release_id: release.data.id,
      body: changelog,
    });
  }
})();
