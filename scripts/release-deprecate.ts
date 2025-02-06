import { compare } from 'compare-versions';
import { exec } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const { log, error } = console;

const deprecateTags = /alpha|0.0.0/;
const { version: currentVersion } = JSON.parse(
  readFileSync(join(process.cwd(), '/packages/fuels/package.json')).toString()
);
const SHOULD_DEPRECATE_VERSIONS: boolean = process.env.DEPRECATE_VERSIONS === 'true';
const CHUNK_SIZE: number = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE, 10) : 1000;
const FILTER_BY_PACKAGE_NAME: string = process.env.FILTER_BY_PACKAGE_NAME ?? '';
const FILTER_BY_VERSION: string = process.env.FILTER_BY_VERSION ?? '';

const getPublicPackages = (): string[] => {
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

const getVersionsToDeprecate = async (packageName: string): Promise<string[]> => {
  const { versions } = await fetch(`https://registry.npmjs.org/${packageName}`).then((resp) =>
    resp.json()
  );

  // Only deprecate certain tags
  const validVersions = Object.entries(versions)
    .filter(
      ([version, metadata]) =>
        metadata?.deprecated === undefined &&
        version.search(deprecateTags) > -1 &&
        !compare(version, currentVersion, '>=')
    )
    .map(([version]) => version);

  // Remove the latest next tag from the deprecation list
  const latestNextVersion = validVersions.filter((version) => version.search('next') > -1).pop();
  return validVersions.filter((version) => version !== latestNextVersion);
};

const main = async () => {
  let packages = getPublicPackages();
  if (FILTER_BY_PACKAGE_NAME !== '') {
    packages = packages.filter((packageName) => packageName === FILTER_BY_PACKAGE_NAME);
  }

  await Promise.allSettled(
    packages.map(async (packageName) => {
      const allVersions = await getVersionsToDeprecate(packageName);

      let versionsToDeprecate = allVersions.splice(0, CHUNK_SIZE);
      if (FILTER_BY_VERSION !== '') {
        versionsToDeprecate = versionsToDeprecate.filter(
          (version) => version === FILTER_BY_VERSION
        );
      }

      log(`The following versions will be deprecated ${packageName}:`);
      log(versionsToDeprecate.map((v) => `   - ${v}`).join('\n'));

      if (SHOULD_DEPRECATE_VERSIONS) {
        await Promise.allSettled(
          versionsToDeprecate.map(
            async (versionToDelete) =>
              new Promise((resolve, reject) => {
                exec(
                  `npm deprecate ${packageName}@${versionToDelete} "Version no longer supported."`,
                  (err, _stdout, stderr) => {
                    if (err) {
                      log(`❌ Error ${packageName}@${versionToDelete} not deprecated!\n`);
                      error(err);
                      reject(err);
                      return;
                    }
                    if (stderr) {
                      log(`❌ Error ${packageName}@${versionToDelete} not deprecated!\n`);
                      error(stderr);
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
