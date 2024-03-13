import * as github from "@actions/github";
import { getInfo } from "@changesets/get-github-info";
import getChangesets from "@changesets/read";
import type { NewChangeset } from "@changesets/types";
import { execSync } from "child_process";
import { join } from "path";

// TODO: the version can be the same as published if changeset is empty
process.env.BUILD_VERSION = "0.77.0";

type Octokit = ReturnType<typeof github.getOctokit>;

const prTypes = ["feat", "fix", "refactor", "chore", "docs"];

interface ChangelogInfo {
  isBreaking: boolean;
  prType: string;
  line: string;
}

async function getSingleChangelogInfo(
  octokit: Octokit,
  changeset: NewChangeset,
): Promise<ChangelogInfo> {
  const changesetCommitLog = execSync(
    `git log --oneline --diff-filter=A -- ${join(
      process.cwd(),
      ".changeset",
      `${changeset.id}.md`,
    )}`,
  ).toString(); // e.g. 1f3d3d3 fix!: add breaking fix

  const [commit] = changesetCommitLog.split(" ");

  const {
    links: { pull: prLink, user },
    pull: prNo,
  } = await getInfo({
    repo: process.env.GITHUB_REPOSITORY ?? "This should be set by GitHub",
    commit,
  });

  const {
    data: { title },
  } = await octokit.rest.pulls.get({
    ...github.context.repo,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    pull_number: prNo!,
  });

  const prType = title.replace(/(\w*)\W/, "$1"); // chore!: -> chore
  const isBreaking = title.includes("!");

  const affectedPackages = changeset.releases.map((x) => x.name).join(", ");

  return {
    prType,
    isBreaking,
    line: `${changeset.summary}, by ${user} (see [#${prNo}](${prLink}))\n(packages: ${affectedPackages})`,
  };
}

async function getChangelogs(octokit: Octokit, changesets: NewChangeset[]) {
  const changesetsWithReleases = changesets.filter(
    (x) => x.releases.length > 0,
  );

  const changesetsWithInfo = await Promise.all(
    changesetsWithReleases.map(async (changeset) =>
      getSingleChangelogInfo(octokit, changeset),
    ),
  );

  const sortedChangesets = changesetsWithInfo.sort((a, b) => {
    const aIdx = prTypes.indexOf(a.prType);
    const bIdx = prTypes.indexOf(b.prType);

    if (aIdx === -1) {
      if (bIdx === -1) {
        return 0;
      }
      return 1;
    }

    if (bIdx === -1) {
      return -1;
    }

    return aIdx - bIdx;
  });

  const breaking = sortedChangesets.filter((x) => x.isBreaking);
  const nonBreaking = sortedChangesets.filter((x) => !x.isBreaking);

  return [breaking, nonBreaking];
}

function mapPrTypeToTitle(changetype: string) {
  switch (changetype) {
    case "feat":
      return "Features";
    case "fix":
      return "Fixes";
    case "chore":
      return "Chores";
    case "docs":
      return "Docs";
    case "ci":
      return "CI";
    default:
      return "Misc";
  }
}

function listChangelogs(changelogs: ChangelogInfo[]) {
  return prTypes
    .filter((t) => changelogs.some((c) => c.prType === t))
    .map(
      (t) => `
### ${mapPrTypeToTitle(t)}

${changelogs
  .filter((c) => c.prType === t)
  .map((c) => c.line)
  .join("\n\n")}
`,
    )
    .join("\n")
    .trim();
}

export async function getFullChangelog(octokit: Octokit) {
  const changesets = await getChangesets(process.cwd());

  const releasedPackages = ["fuels"].concat(
    changesets
      .flat()
      .flatMap((changeset) => changeset.releases.map((y) => y.name))
      .filter((name, idx, arr) => arr.indexOf(name) === idx)
      .sort((a, b) => a.localeCompare(b)),
  );

  const [breaking, nonBreaking] = await getChangelogs(octokit, changesets);

  const content = `
# RELEASE - ${process.env.BUILD_VERSION}
    
${releasedPackages.join(", ")}
    
## Breaking Changes
    
${listChangelogs(breaking) || "Yay, no breaking changes!"}
    
## Non-breaking Changes
    
${listChangelogs(nonBreaking)}
`;

  return content.trim();
}
