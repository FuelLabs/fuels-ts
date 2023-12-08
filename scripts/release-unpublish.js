import { versions } from '@fuel-ts/versions';
import { exec } from 'child_process';
import { compare } from 'compare-versions';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DELETE_TAGS = /next|pr/;
const { FUELS: CURRENT_VERSION } = versions;
const DELETE_PACKAGES = process.env.DELETE_PACKAGES === 'true';
const dryRun = DELETE_PACKAGES ? '' : '--dry-run';

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
    versionsToDelete.map(async (versionToDelete) => {
      const { stderr } = await exec(`npm unpublish ${packageName}@${versionToDelete} ${dryRun}`);
      if (stderr) {
        log(`❌ Error ${packageName}@${versionToDelete} not deleted!\n`);
      } else {
        log(`✅ Package ${packageName}@${versionToDelete} deleted!\n`);
      }
    });
  });
};

main().catch((err) => {
  error(err);
  process.exit(1);
});
