import * as github from "@actions/github";
import { getInfo } from "@changesets/get-github-info";
import getChangesets from "@changesets/read";
import type { NewChangeset } from "@changesets/types";
import { execSync } from "child_process";
import { join } from "path";

type Octokit = ReturnType<typeof github.getOctokit>;

interface ChangelogInfo {
  isBreaking: boolean;
  prType: string;
  markdown: string;
}

const prTypes = ["feat", "fix", "refactor", "chore", "docs"];

async function getChangelogInfo(
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

  const prType = title.replace(/(\w+).*/, "$1"); // chore!: add something -> chore
  const isBreaking = title.includes(`${prType}!`);

  const titleDescription = title.replace(/\w+\W+(.*)/, "$1"); // chore!: add something -> add something
  const summary =
    titleDescription.charAt(0).toUpperCase() + titleDescription.slice(1);

  const markdown = `- ${prLink} - ${summary}, by ${user}`;
  return {
    prType,
    isBreaking,
    markdown,
  };
}

function sortChangelogsByPrType(a: ChangelogInfo, b: ChangelogInfo) {
  const aIdx = prTypes.indexOf(a.prType);
  const bIdx = prTypes.indexOf(b.prType);

  if (aIdx === -1) {
    return bIdx === -1 ? 0 : 1;
  }

  if (bIdx === -1) {
    return -1;
  }

  return aIdx - bIdx;
}

async function getChangelogs(octokit: Octokit, changesets: NewChangeset[]) {
  const changesetsWithReleases = changesets.filter(
    (x) => x.releases.length > 0,
  );
  const changelogs = await Promise.all(
    changesetsWithReleases.map(async (changeset) =>
      getChangelogInfo(octokit, changeset),
    ),
  );

  return changelogs.sort(sortChangelogsByPrType);
}

function mapPrTypeToTitle(prType: string) {
  switch (prType) {
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

function groupChangelogsForListing(changelogs: ChangelogInfo[]) {
  const prTypeWithChangelogs = prTypes.reduce(
    (acc, prType) => {
      acc[prType] = changelogs
        .filter((c) => c.prType === prType)
        .map((c) => c.markdown);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return Object.entries(prTypeWithChangelogs)
    .filter(([, c]) => c.length > 0)
    .map(([prType, c]) => [mapPrTypeToTitle(prType), c] as [string, string[]]);
}

function listBreakingMd(changelogs: ChangelogInfo[]) {
  const changelogGroups = groupChangelogsForListing(
    changelogs.filter((x) => x.isBreaking),
  );

  return changelogGroups
    .map(
      ([groupTitle, c]) => `- ${groupTitle}
${c.map((x) => `    ${x}`).join("\n")}`,
    )
    .join("\n")
    .trim();
}

function listNonBreakingMd(changelogs: ChangelogInfo[]) {
  const changelogGroups = groupChangelogsForListing(
    changelogs.filter((x) => !x.isBreaking),
  );

  return changelogGroups
    .map(
      ([groupTitle, c]) => `# ${groupTitle}
${c.join("\n")}`,
    )
    .join("\n\n")
    .trim();
}

export async function getFullChangelog(octokit: Octokit) {
  const changesets = await getChangesets(process.cwd());

  const changelogs = await getChangelogs(octokit, changesets);

  const breaking = listBreakingMd(changelogs);
  const nonBreaking = listNonBreakingMd(changelogs);

  let content = `# RELEASE - ${process.env.RELEASE_TAG ?? "TBD"}\n\n`;
  content += breaking ? `# Breaking\n\n${breaking}` : "";
  content += breaking && nonBreaking && "\n\n---\n\n";
  content += nonBreaking;

  return content.trim();
}
