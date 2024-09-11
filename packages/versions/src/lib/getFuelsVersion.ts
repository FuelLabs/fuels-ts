import fs from 'fs';
import path from 'path';

const findUserPackageJson = () => {
  if (!require.main) {
    return null;
  }

  let currentDir = path.dirname(require.main.filename);

  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
};

const getLatestFuelsVersion = async () => {
  // get the latest version from the npm registry
  const response = await fetch('https://registry.npmjs.org/fuels/latest');
  const data = await response.json();
  return data.version;
};

export async function getFuelsVersion() {
  console.log(await getLatestFuelsVersion());

  const packageJsonPath = findUserPackageJson();
  if (!packageJsonPath) {
    return null;
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.version;
}
