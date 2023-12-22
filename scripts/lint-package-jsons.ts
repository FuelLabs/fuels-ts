import { error } from 'console';
import { readFileSync } from 'fs';
import { globSync } from 'glob';

interface PackageJson {
  private: boolean;
  author: string;
  engines: {
    node: string;
  };
}

const {
  author,
  engines: { node: repoNodeVersion },
} = JSON.parse(readFileSync('package.json', 'utf-8')) as PackageJson;

const expectedAuthor = 'Fuel Labs <contact@fuel.sh> (https://fuel.network/)';

const node20 = '^20.0.0';
const expectedNode = `^18.18.2 || ${node20}`;

if (author !== expectedAuthor) {
  error(`The package.json's author field should be '${expectedAuthor}'`);
  process.exit(1);
}

if (repoNodeVersion !== node20) {
  error(`The package.json's engines.node field should be '${expectedNode}'`);
  process.exit(1);
}

const faultyPackageJsons = globSync(`{packages,apps}/*/package.json`)
  .filter((path) => !/\/forc|fuel-core\//.test(path))
  .filter((path) => {
    const json = JSON.parse(readFileSync(path, 'utf-8')) as PackageJson;
    return json.private ? false : json.author !== author || json.engines.node !== expectedNode;
  });

if (faultyPackageJsons.length) {
  const expectedConfigs = {
    author,
    engines: { node: expectedNode },
  };

  error(
    [
      `Expected configs:`,
      JSON.stringify(expectedConfigs, null, 2),
      `\nPlease review and correct these files:`,
      faultyPackageJsons.map((f) => ` - ${f}`).join('\n'),
    ].join('\n')
  );

  process.exit(1);
}
