import { getInfo } from "@changesets/get-github-info";
import getChangesets from "@changesets/read";
import type { NewChangeset } from "@changesets/types";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

process.env.GITHUB_TOKEN = readFileSync(".github-token", "utf-8").trim();
// TODO: the version can be the same as published if changeset is empty
process.env.BUILD_VERSION = "0.77.0";
const REPO = "FuelLabs/fuels-ts";

function sortChangesetsByVersion<T extends Pick<NewChangeset, "releases">>(
  a: T,
  b: T,
) {
  if (a.releases.some((x) => x.type === "major")) {
    return -1;
  }

  if (b.releases.some((x) => x.type === "major")) {
    return 1;
  }

  if (a.releases.some((x) => x.type === "minor")) {
    return -1;
  }

  if (b.releases.some((x) => x.type === "minor")) {
    return 1;
  }

  if (a.releases.some((x) => x.type === "patch")) {
    return -1;
  }

  if (b.releases.some((x) => x.type === "patch")) {
    return 1;
  }

  return 0;
}

async function getChangesetInfo() {
  const allChangesets = await getChangesets(process.cwd());
  const changesetsWithReleases = allChangesets.filter(
    (x) => x.releases.length > 0,
  );
  const changesetsWithInfo = await Promise.all(
    changesetsWithReleases.map(async (changeset) => {
      const result = execSync(
        `git log --oneline --diff-filter=A -- ${join(
          process.cwd(),
          ".changeset",
          `${changeset.id}.md`,
        )}`,
      ).toString(); // e.g. 1f3d3d3 fix!: add breaking fix

      const [commit, changeType] = result.split(" ");
      const cleanedUpChangeType = changeType.replace(/(\w*)\W/, "$1"); // chore!: -> chore
      const isBreaking = changeType.includes("!");
      const {
        links: { pull: prLink, user },
        pull: prNo,
      } = await getInfo({ repo: REPO, commit });

      const affectedPackages = changeset.releases.map((x) => x.name).join(", ");

      return {
        changetype: cleanedUpChangeType,
        isBreaking,
        releases: changeset.releases,
        line: `${changeset.summary}, by ${user} (see [#${prNo}](${prLink}))\n(packages: ${affectedPackages})`,
      };
    }),
  );

  return changesetsWithInfo.sort(sortChangesetsByVersion).sort((a, b) => {
    if (a.isBreaking) {
      return -1;
    }

    return b.isBreaking ? 1 : 0;
  });
}

const changesets = await getChangesetInfo();

const releasedPackages = ["fuels"].concat(
  changesets
    .flatMap((changeset) => changeset.releases.map((y) => y.name))
    .filter((name, idx, arr) => arr.indexOf(name) === idx)
    .sort((a, b) => a.localeCompare(b)),
);

function createChangesList(changes: typeof changesets) {
  const feats = changes.filter((x) => x.changetype === "feat");
  const fixes = changes.filter((x) => x.changetype === "fix");
  const refactors = changes.filter((x) => x.changetype === "refactor");
  const chores = changes.filter((x) => x.changetype === "chore");
  const docs = changes.filter((x) => x.changetype === "docs");

  const featuresLine =
    feats.length > 0
      ? `
### Features
  
${feats.map((x) => x.line).join("\n\n")}`
      : "";
  const fixesLine =
    fixes.length > 0
      ? `
### Fixes
  
${fixes.map((x) => x.line).join("\n\n")}`
      : "";

  const refactorsLine =
    refactors.length > 0
      ? `
### Refactors
  
${refactors.map((x) => x.line).join("\n\n")}`
      : "";

  const choresLine =
    chores.length > 0
      ? `
### Chores
  
${chores.map((x) => x.line).join("\n\n")}`
      : "";

  const docsLine =
    docs.length > 0
      ? `
### Docs

${docs.map((x) => x.line).join("\n\n")}`
      : "";

  return `
${featuresLine}

${fixesLine}

${refactorsLine}

${choresLine}

${docsLine}
`.trim();
}

const content = `
# RELEASE - ${process.env.BUILD_VERSION}

${releasedPackages.join(", ")}

## Breaking Changes

${
  createChangesList(changesets.filter((x) => x.isBreaking)) ||
  "Yay, no breaking changes!"
}

## Non-breaking Changes

${createChangesList(changesets.filter((x) => !x.isBreaking)).trim()}
`;

await writeFile("TEST-CHANGELOG.md", content);

// TODO: add changes without any release under a "Misc" section
// The change will be presented either with a summary from the changelog or with the name of the commit
