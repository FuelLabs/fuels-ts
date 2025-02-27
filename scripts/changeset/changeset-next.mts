import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

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
  // Filter out private packages
  .filter((pkg) => !pkg.contents.private);

/**
 * Add a changeset to bump all package versions
 */
const packagesToBump = packages.map((pkg) => `"${pkg.contents.name}": patch`);
const output = `---\n${packagesToBump.join("\n")}\n---\n\nincremental\n`;
writeFileSync(".changeset/fuel-labs-ci.md", output);
execSync(`git add .changeset/fuel-labs-ci.md`);
