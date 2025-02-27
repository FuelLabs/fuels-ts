import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const CHANGESET_CONFIG_PATH = ".changeset/config.json";

/**
 * Gather all the package.json files to be published
 */
const packages = globSync("**/package.json", {
  ignore: ["**/dist/**", "**/node_modules/**"],
})
  // Read in the package.json file
  .map((fileName) => {
    const packageJson = JSON.parse(readFileSync(fileName, "utf-8"));
    return {
      path: fileName,
      contents: packageJson,
    };
  })
  // Filter out private packages (expect templates)
  .filter((pkg) => !pkg.contents.private || pkg.path.includes("templates"));


/**
 * Update the changeset config to include the FuelLabs organization scope
 */
const packageNames = packages.map((pkg) => pkg.contents.name);
const changesetConfigContents = JSON.parse(
  readFileSync(CHANGESET_CONFIG_PATH, "utf-8"),
);
const changesetConfig = {
  ...changesetConfigContents,
  ignore: [
    ...changesetConfigContents.ignore.filter(ignorePackageName => !packageNames.includes(ignorePackageName)),
  ]
};
writeFileSync(CHANGESET_CONFIG_PATH, JSON.stringify(changesetConfig, null, 2));
execSync(`git add ${CHANGESET_CONFIG_PATH}`);

/**
 * Add a changeset to bump all package versions
 */
const packagesToBump = packages.map((pkg) => `"${pkg.contents.name}": patch`);
const output = `---\n${packagesToBump.join("\n")}\n---\n\nincremental\n`;
writeFileSync(".changeset/fuel-labs-ci.md", output);
execSync(`git add .changeset/fuel-labs-ci.md`);
