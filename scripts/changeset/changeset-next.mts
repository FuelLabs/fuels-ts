import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const CHANGESET_CONFIG_PATH = ".changeset/config.json";
const GITHUB_ORGANIZATION_SCOPE = "@FuelLabs";

const formatPackageName = (name: string) =>
  `${GITHUB_ORGANIZATION_SCOPE}/${name.replace("@fuel-ts/", "")}`;

const formatPackageJsonContents = (contents: { name: string }) => ({
  ...contents,
  // We need to add the GitHub organization name to the scope to publish to GitHub
  // We also need to strip off and prefixes (e.g. '@fuel-ts/' -> '')
  name: formatPackageName(contents.name),
  // We also need a repository field to publish to GitHub
  repository: "https://github.com/FuelLabs/fuels-ts",
});

/**
 * Gather all the package.json files to be published
 */
const packages = globSync("**/package.json")
  // Read in the package.json file
  .map((fileName) => {
    const packageJson = JSON.parse(readFileSync(fileName, "utf-8"));
    return {
      path: fileName,
      contents: packageJson,
    };
  })
  // Filter out private packages
  .filter((pkg) => !pkg.contents.private);

// Format the package contents to be used to publish to GitHub
packages
  .map((pkg) => ({
    path: pkg.path,
    contents: formatPackageJsonContents(pkg.contents),
  }))
  .forEach((pkg) => {
    // Write the formatted package.json files
    writeFileSync(pkg.path, JSON.stringify(pkg.contents, null, 2));
    // Add the formatted package.json files to the git index
    execSync(`git add ${pkg.path}`);
  });

/**
 * Update the changeset config to include the FuelLabs organization scope
 */
const changesetConfigContents = JSON.parse(
  readFileSync(CHANGESET_CONFIG_PATH, "utf-8"),
);
const changesetConfig = {
  ...changesetConfigContents,
  fixed: [[`${GITHUB_ORGANIZATION_SCOPE}/*`]],
};
writeFileSync(CHANGESET_CONFIG_PATH, JSON.stringify(changesetConfig, null, 2));
execSync(`git add ${CHANGESET_CONFIG_PATH}`);

/**
 * Update all pre-existing changeset package scopes
 */
const packageNames = packages.map((pkg) => pkg.contents.name).join("|");
const regex = new RegExp(packageNames, "g");
globSync(".changeset/*.md")
  .map((fileName) => {
    const contents = readFileSync(fileName, "utf-8");
    return {
      path: fileName,
      contents,
    };
  })
  .forEach((pkg) => {
    writeFileSync(pkg.path, pkg.contents.replace(regex, formatPackageName));
    execSync(`git add ${pkg.path}`);
  });

/**
 * Add a changeset for the next `fuels` version
 */
const output = `---\n"${GITHUB_ORGANIZATION_SCOPE}/fuels": patch\n---\n\nincremental\n`;
writeFileSync(".changeset/fuel-labs-ci.md", output);
execSync(`git add .changeset/fuel-labs-ci.md`);
