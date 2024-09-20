/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as github from "@actions/github";
import { LinearClient } from "@linear/sdk";

import { prToLinearLinker } from "./pr-to-linear-linker";

const { GITHUB_REPOSITORY, GITHUB_TOKEN, LINEAR_API_KEY, PULL_NUMBER } =
  process.env;

const missingEnvironmentVariables: string[] = [];

if (GITHUB_REPOSITORY === undefined) {
  missingEnvironmentVariables.push("GITHUB_REPOSITORY");
}
if (GITHUB_TOKEN === undefined) {
  missingEnvironmentVariables.push("GITHUB_TOKEN");
}
if (LINEAR_API_KEY === undefined) {
  missingEnvironmentVariables.push("LINEAR_API_KEY");
}
if (PULL_NUMBER === undefined) {
  missingEnvironmentVariables.push("PULL_NUMBER");
}
if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Missing environment variables: ${missingEnvironmentVariables.join(", ")}. Please pass them in.`,
  );
}
const octokit = github.getOctokit(GITHUB_TOKEN!);
const linearClient = new LinearClient({ apiKey: LINEAR_API_KEY });
const pullNumber = parseInt(PULL_NUMBER!, 10);
const [owner, repo] = GITHUB_REPOSITORY!.split("/");

// @ts-expect-error top-level await warning, but we're in a .mts script so it's fine
await prToLinearLinker({ pullNumber, owner, repo, octokit, linearClient });
