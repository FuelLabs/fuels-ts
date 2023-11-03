import { execSync } from 'child_process';
import { readFileSync } from 'fs';

interface PackageJson {
  private: boolean;
  author: string;
  engines: {
    node: string;
    pnpm: string;
  };
  packageManager: string;
}

const {
  author: rootAuthor,
  engines: { node: rootNodeVersion, pnpm: rootPnpmVersion },
  packageManager: rootPackageManager,
} = JSON.parse(readFileSync('package.json', 'utf-8')) as PackageJson;

if (rootAuthor !== 'Fuel Labs <contact@fuel.sh> (https://fuel.network/)')
  throw new Error(
    "The package.json's author field should be 'Fuel Labs <contact@fuel.sh> (https://fuel.network/)' "
  );

const faultyPackageJsons = execSync('find packages/ apps/ -name package.json')
  .toString()
  .split('\n')
  .filter(
    (path) =>
      path !== '' &&
      !path.includes('/forc/') &&
      !path.includes('/fuel-core/') &&
      !path.match(/\/\..*\//) // internal folders like .next/package.json, .vitepress/package.json
  )
  .map(
    (path) =>
      ({ ...JSON.parse(readFileSync(path.trim(), 'utf-8')), path }) as PackageJson & {
        path: string;
      }
  )
  .filter((packageJson) => !packageJson.private)
  .filter(
    ({ engines: { node, pnpm }, packageManager, author }) =>
      node !== rootNodeVersion ||
      pnpm !== rootPnpmVersion ||
      packageManager !== rootPackageManager ||
      author !== rootAuthor
  )
  .map(({ path, engines: { node, pnpm }, packageManager, author }) => {
    let message = `\n${path}`;
    if (node !== rootNodeVersion)
      message += `\n\tengines.node: ${node} should be ${rootNodeVersion}`;
    if (pnpm !== rootPnpmVersion)
      message += `\n\tengines.pnpm: ${pnpm} should be ${rootPnpmVersion}`;
    if (packageManager !== rootPackageManager)
      message += `\n\tpackageManager: ${packageManager} should be ${rootPackageManager}`;
    if (author !== rootAuthor) message += `\n\tauthor: "${author}" should be "${rootAuthor}"`;

    return message;
  });

if (faultyPackageJsons.length) {
  throw new Error(
    `The package.json files listed below differ from the root package.json:\n ${faultyPackageJsons.join(
      '\n'
    )}`
  );
}
