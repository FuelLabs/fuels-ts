import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const GITHUB_ORGANIZATION_SCOPE = "@FuelLabs";

const formatPackageJsonContents = (contents: { name: string }) => ({
  ...contents,
  // We need to add the GitHub organization name to the scope to publish to GitHub
  // We also need to strip off and prefixes (e.g. '@fuel-ts/' -> '')
  name: `${GITHUB_ORGANIZATION_SCOPE}/${contents.name.replace("@fuel-ts/", "")}`,
  // We also need a repository field to publish to GitHub
  repository: "https://github.com/FuelLabs/fuels-ts",
});

/**
 * Gather all the package.json files to be published
 * and format them to be used to publish to GitHub packages
 */
globSync("**/package.json")
  // Read in the package.json file
  .map((fileName) => {
    const packageJson = JSON.parse(readFileSync(fileName, "utf-8"));
    return {
      path: fileName,
      contents: packageJson,
    };
  })
  // Filter out private packages
  .filter((pkg) => !pkg.contents.private)
  // Format the package contents to be used to publish to GitHub
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
