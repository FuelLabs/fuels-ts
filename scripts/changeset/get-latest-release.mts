import * as core from "@actions/core";
import * as github from "@actions/github";

const { GITHUB_TOKEN } = process.env;
if (GITHUB_TOKEN) {
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const latest = await octokit.rest.repos.getLatestRelease(github.context.repo);
  console.log(latest.data.tag_name);
} else {
  core.setFailed("Please add GITHUB_TOKEN to the environment");
}
