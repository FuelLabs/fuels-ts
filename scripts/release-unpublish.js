/* eslint-disable @typescript-eslint/no-var-requires */
const { compare } = require('compare-versions');
const { readFileSync, readdirSync } = require('node:fs');
const { join } = require('node:path');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const DELETE_TAGS = /next|pr/;
const { version: CURRENT_VERSION } = require('../packages/fuels/package.json');

const DELETE_PACKAGES = process.env.DELETE_PACKAGES === 'true';
const dryRun = DELETE_PACKAGES ? '' : '--dry-run';

// MESSAGES
const SUCCESS_EMOJI = DELETE_PACKAGES ? '✅' : '🧪';
const SUCCESS_MESSAGE = DELETE_PACKAGES ? 'deleted' : 'CAN be deleted (dry-run)';
const DRY_RUN_DISCLAIMER = DELETE_PACKAGES ? '' : '(dry-run)';

const { log, error } = console;

const getPublicPackages = () => {
  const packagesDir = join(__dirname, '../packages');
  const packages = readdirSync(packagesDir, { withFileTypes: true });
  const packagesNames = packages.map((p) => {
    try {
      const packageContent = readFileSync(join(packagesDir, p.name, 'package.json'), 'utf8');
      const packageJson = JSON.parse(packageContent.toString());
      return packageJson.private ? null : packageJson.name;
    } catch (err) {
      return null;
    }
  });
  return packagesNames.filter((p) => !!p);
};

const main = async () => {
  const packages = getPublicPackages();
  await packages.map(async (packageName) => {
    log(`📦 Fetching ${packageName} versions`);
    const { versions: packageVersions } = await fetch(
      `https://registry.npmjs.org/${packageName}`
    ).then((resp) => resp.json());

    const versionsToDelete = Object.keys(packageVersions).filter(
      (packageVersion) =>
        packageVersion.search(DELETE_TAGS) > -1 && !compare(packageVersion, CURRENT_VERSION, '>=')
    );
    log('The following versions will be deleted:');
    log(versionsToDelete.map((v) => `   - ${v}`).join('\n'));

    for (const versionToDelete of versionsToDelete) {
      try {
        const { stderr } = await exec(`npm unpublish ${packageName}@${versionToDelete} ${dryRun}`);
        if (stderr) {
          throw new Error(stderr);
        }

        log(`${SUCCESS_EMOJI} Package ${packageName}@${versionToDelete} ${SUCCESS_MESSAGE}!\n`);
      } catch (err) {
        error(
          `❌ Failed attempting to delete ${packageName}@${versionToDelete} ${DRY_RUN_DISCLAIMER}!\n`
        );
        error(err);
      }
    }
  });
};

main().catch((err) => {
  error(err);
  process.exit(1);
});
