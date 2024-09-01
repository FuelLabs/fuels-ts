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
  views: {
    bulletPoint: string;
    migrationNote: string;
    releaseNotes: string;
  };
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const prTypes = ["feat", "fix", "refactor", "chore", "docs"];

async function getChangelogInfo(
  octokit: Octokit,
  changeset: NewChangeset,
): Promise<ChangelogInfo | undefined> {
  const changesetCommit = execSync(
    `git log -n 1 --diff-filter=A --oneline --pretty=format:%H -- ${join(
      process.cwd(),
      ".changeset",
      `${changeset.id}.md`,
    )}`,
  ).toString(); // e.g. d603eecd1e453c60fe8cadfd1bfe530050ff0cfe

  const {
    links: { pull: formattedPrLink, user },
    pull: prNo,
  } = await getInfo({
    repo: process.env.GITHUB_REPOSITORY ?? "This should be set by GitHub",
    commit: changesetCommit,
  });

  const {
    data: { title, body },
  } = await octokit.rest.pulls.get({
    ...github.context.repo,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    pull_number: prNo!,
  });

  /**
   * There are special cases that follow a different flow.
   * e.g. https://github.com/FuelLabs/fuels-ts/commit/16ee1bfe66733551d00f0a76c21e8a09ea33006f.
   * They should be ignored in the changelogs.
   */
  if (title === undefined) {
    return undefined;
  }

  const prType = title.replace(/(\w+).*/, "$1"); // chore!: add something -> chore
  const isBreaking = title.includes(`${prType}!`);

  const titleDescription = title.replace(/\w+!?:(.*)/, "$1").trim(); // chore!: add something -> add something

  const bulletPoint = `- ${formattedPrLink} - ${capitalize(titleDescription)}, by ${user}`;

  const breakingChangesRegex =
    /[\s\S]+# Breaking Changes([\s\S]+)# Checklist[\s\S]+/m;

  const breakingChanges =
    breakingChangesRegex.exec(body ?? "")?.[1].trim() ?? "";

  const releaseNotesRegex = /[\s\S]*In this release, we:([\s\S]+?)# [\s\S]*/m;
  const releaseNotes = releaseNotesRegex.exec(body ?? "")?.[1].trim() ?? "";

  const prLink = formattedPrLink?.replace(/.*\((.*)\)/, "$1"); // [#2637](https://github.com/FuelLabs/fuels-ts/pull/2637) -> https://github.com/FuelLabs/fuels-ts/pull/2637
  const migrationNote = `### [#${prNo} - ${capitalize(titleDescription)}](${prLink})

  ${breakingChanges}`;

  return {
    prType,
    isBreaking,
    views: {
      bulletPoint,
      migrationNote,
      releaseNotes,
    },
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

  return changelogs.filter((c) => c !== undefined).sort(sortChangelogsByPrType);
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
      acc[prType] = changelogs.filter((c) => c.prType === prType);
      return acc;
    },
    {} as Record<string, ChangelogInfo[]>,
  );

  return Object.entries(prTypeWithChangelogs)
    .filter(([, c]) => c.length > 0)
    .map(
      ([prType, c]) =>
        [mapPrTypeToTitle(prType), c] as [string, ChangelogInfo[]],
    );
}

function listReleaseNotes(changelogs: ChangelogInfo[]) {
  return changelogs
    .map((c) => c.views.releaseNotes)
    .filter((releaseNote) => releaseNote !== "")
    .join("\n");
}

function listBreakingMd(changelogs: ChangelogInfo[]) {
  const changelogGroups = groupChangelogsForListing(
    changelogs.filter((x) => x.isBreaking),
  );

  return changelogGroups
    .map(
      ([groupTitle, c]) => `- ${groupTitle}
${c.map((changelog) => `    ${changelog.views.bulletPoint}`).join("\n")}`,
    )
    .join("\n")
    .trim();
}

function listMigrationNotes(changelogs: ChangelogInfo[]) {
  const changelogGroups = groupChangelogsForListing(
    changelogs.filter((x) => x.isBreaking),
  );

  return changelogGroups
    .map(
      ([groupTitle, c]) => `## ${groupTitle}
${c.map((changelog) => changelog.views.migrationNote).join("\n")}`,
    )
    .join("\n\n")
    .trim();
}

function listNonBreakingMd(changelogs: ChangelogInfo[]) {
  const changelogGroups = groupChangelogsForListing(
    changelogs.filter((x) => !x.isBreaking),
  );

  return changelogGroups
    .map(
      ([groupTitle, c]) => `# ${groupTitle}
${c.map((changelog) => changelog.views.bulletPoint).join("\n")}`,
    )
    .join("\n\n")
    .trim();
}

export async function getFullChangelog(octokit: Octokit) {
  const changesets = await getChangesets(process.cwd());

  const changelogs = await getChangelogs(octokit, changesets);

  const releaseNotes = listReleaseNotes(changelogs);
  const breaking = listBreakingMd(changelogs);
  const nonBreaking = listNonBreakingMd(changelogs);
  const migrationNotes = listMigrationNotes(changelogs);

  let content = "";

  content += releaseNotes
    ? `# Summary\n\nIn this release, we:\n${releaseNotes}\n\n`
    : "";
  content += breaking ? `# Breaking\n\n${breaking}` : "";
  content += breaking && nonBreaking && "\n\n---\n\n";
  content += nonBreaking;
  content += migrationNotes
    ? `\n\n---\n\n# Migration Notes\n\n${migrationNotes}`
    : "";

  return content.trim();
}
