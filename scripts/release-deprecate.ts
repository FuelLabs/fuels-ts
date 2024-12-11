import { compare } from 'compare-versions';
import { exec } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const { log, error } = console;

const deprecateTags = /next|pr|rc/;
const { version: currentVersion } = JSON.parse(
  readFileSync(join(process.cwd(), '/packages/fuels/package.json')).toString()
);
const deprecateVersions = process.env.DEPRECATE_VERSIONS === 'true';

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

const getVersionsToDeprecate = async (packageName: string) => {
  const { versions } = await fetch(`https://registry.npmjs.org/${packageName}`).then((resp) =>
    resp.json()
  );

  // Only deprecate certain tags
  const validVersions = Object.keys(versions).filter(
    (version) => version.search(deprecateTags) > -1 && !compare(version, currentVersion, '>=')
  );

  // Remove the latest next tag from the deprecation list
  const latestNextVersion = validVersions.filter((version) => version.search('next') > -1).pop();
  return validVersions.filter((version) => version !== latestNextVersion);
};

const main = async () => {
  // const packages = getPublicPackages();
  const packages = ['fuels'];
  await Promise.allSettled(
    packages.map(async (packageName) => {
      const versionsToDeprecate = await getVersionsToDeprecate(packageName);

      log('The following versions will be deprecated:');
      log(versionsToDeprecate.map((v) => `   - ${v}`).join('\n'));

      if (deprecateVersions) {
        await Promise.allSettled(
          versionsToDeprecate.map(
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
      }
    })
  );
};

main().catch((err) => {
  error(err);
  process.exit(1);
});
