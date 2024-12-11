import { compare } from 'compare-versions';
import { exec } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const { log, error } = console;

const UNPUBLISH_TAGS = /next|pr|rc/;
const { version: CURRENT_VERSION } = JSON.parse(
  readFileSync(join(process.cwd(), '/packages/fuels/package.json')).toString()
);

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
  await Promise.all(
    packages.map(async (packageName) => {
      const { versions: packageVersions } = await fetch(
        `https://registry.npmjs.org/${packageName}`
      ).then((resp) => resp.json());

      const versionsToDelete = Object.keys(packageVersions).filter(
        (packageVersion) =>
          packageVersion.search(UNPUBLISH_TAGS) > -1 &&
          !compare(packageVersion, CURRENT_VERSION, '>=')
      );
      log('The following versions will be deprecated:');
      log(versionsToDelete.map((v) => `   - ${v}`).join('\n'));

      await Promise.all(
        versionsToDelete.map(
          async (versionToDelete) =>
            new Promise((resolve, reject) => {
              exec(
                `npm deprecate ${packageName}@${versionToDelete} "Version no longer supported."`,
                (err, _stdout, stderr) => {
                  if (err) {
                    log(`❌ Error ${packageName}@${versionToDelete} not deprecated!\n`);
                    reject(err);
                    return;
                  }
                  if (stderr) {
                    log(`❌ Error ${packageName}@${versionToDelete} not deprecated!\n`);
                    reject(new Error(stderr));
                    return;
                  }
                  log(`✅ Package ${packageName}@${versionToDelete} deprecated!\n`);
                  resolve(true);
                }
              );
            })
        )
      );
    })
  );
};

main().catch((err) => {
  error(err);
  process.exit(1);
});
