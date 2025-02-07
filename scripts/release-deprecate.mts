import { globSync } from "glob";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const { log, error } = console;

/**
 * Parse ENVS
 */
const SHOULD_DEPRECATE_VERSIONS: boolean =
  process.env.DEPRECATE_VERSIONS === "true";
const FILTER_BY_PACKAGE_NAME: string = process.env.FILTER_BY_PACKAGE_NAME ?? "";

/**
 * Restricted tags that can be deprecated
 */
const DEPRECIABLE_TAGS: string[] = [
  ">=0.0.0-pr <0.0.1 || >=0.0.0-next <0.0.1 || >=0.0.0-master <0.0.1",
];

/**
 * Packages that are no longer published to npm
 */
const NO_LONGER_MAINTAINED_PACKAGES: string[] = [
  "@fuel-ts/merkle-shared",
  "@fuel-ts/merklesum",
  "@fuel-ts/sparsemerkle",
  "@fuel-ts/providers",
  "@fuel-ts/example-contract",
  "@fuel-ts/wallet",
  "@fuel-ts/typechain-target-fuels",
  "@fuel-ts/testcases",
  "@fuel-ts/wordlists",
  "@fuel-ts/mnemonic",
  "@fuel-ts/signer",
  "@fuel-ts/hdwallet",
  "@fuel-ts/constants",
  "@fuel-ts/interfaces",
  "@fuel-ts/keystore",
  "@fuel-ts/wallet-manager",
  "@fuel-ts/predicate",
  "@fuel-ts/asm",
  "@fuel-ts/fuel-core",
  "@fuel-ts/forc",
];

const MAINTAINED_PACKAGES: string[] = globSync("**/package.json")
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
  .map((pkg) => pkg.contents.name);

let allPackages: string[] = [
  ...MAINTAINED_PACKAGES,
  ...NO_LONGER_MAINTAINED_PACKAGES,
];

// Only by using filter by package name, are we allowed to deprecate the no longer maintained packages
if (FILTER_BY_PACKAGE_NAME !== "") {
  allPackages = allPackages.filter((pkg) => pkg === FILTER_BY_PACKAGE_NAME);

  // Ensure that we have found a package
  if (allPackages.length === 0) {
    error(`❌ No package found with name: ${FILTER_BY_PACKAGE_NAME}`);
    process.exit(1);
  }
}

/**
 * Construct the depreciable package and versions
 */
const deprecatePackageVersions = async (packages: string[]) => {
  // Gather the depreciable package and versions
  const depreciablePackageAndVersions = packages.flatMap((pkgName) =>
    DEPRECIABLE_TAGS.map((tag) => `${pkgName}@"${tag}"`),
  );
  log(
    "The following packages and versions will be deprecated\n",
    depreciablePackageAndVersions.join("\n"),
    "----------------------------------\n",
  );

  // Perform the deprecations of the packages and versions
  for await (const packageAndVersion of depreciablePackageAndVersions) {
    log(`Deprecating ${packageAndVersion}`);

    const dryRun = SHOULD_DEPRECATE_VERSIONS ? "" : "--dry-run ";
    const deprecateCommand = `npm deprecate ${packageAndVersion} ${dryRun}"Version no longer supported."`;

    try {
      const result = execSync(deprecateCommand);
      log(`✅ Deprecated ${packageAndVersion}`);
      log(result.toString());
    } catch (err) {
      error(`❌ Error - unable to deprecate ${packageAndVersion}`);
      error(err);
    }

    // Wait for 1 second to avoid rate limiting
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
};

await deprecatePackageVersions(allPackages);

