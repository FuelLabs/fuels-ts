import fs from 'fs/promises';
import path from 'path';

const platforms = {
  darwin: {
    arm64: 'darwin_arm64',
    x64: 'darwin_amd64',
  },
  linux: {
    arm64: 'linux_arm64',
    x64: 'linux_amd64',
  },
};
export const getPkgPlatform = () => {
  if (process.platform !== 'darwin' && process.platform !== 'linux') {
    throw new Error(`Unsupported platform ${process.platform}`);
  }
  if (process.arch !== 'arm64' && process.arch !== 'x64') {
    throw new Error(`Unsupported arch ${process.arch}`);
  }
  return platforms[process.platform][process.arch];
};

const pkgJsonPath = path.join(__dirname, '../package.json');

export const getCurrentVersion = async () => {
  const pkgJson = await fs.readFile(pkgJsonPath, 'utf8');
  const { forcVersion } = JSON.parse(pkgJson).config;
  return forcVersion;
};

export const setCurrentVersion = async (version: string) => {
  const pkgJson = await fs.readFile(pkgJsonPath, 'utf8');
  const { forcVersion } = JSON.parse(pkgJson).config;
  const wrap = (v: string) => `"forcVersion": "${v}"`;
  // Do a text replacement to not break the formatting
  const content = pkgJson.replace(wrap(forcVersion), wrap(version));
  await fs.writeFile(pkgJsonPath, content);
};
