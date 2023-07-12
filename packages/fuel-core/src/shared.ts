import fs from 'fs/promises';
import path from 'path';
import sh from 'shelljs';

const platforms = {
  darwin: {
    arm64: 'aarch64-apple-darwin',
    x64: 'x86_64-apple-darwin',
  },
  linux: {
    arm64: 'aarch64-unknown-linux-gnu',
    x64: 'x86_64-unknown-linux-gnu',
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

const versionFilePath = path.join(__dirname, '../VERSION');

export const getCurrentVersion = async () => {
  const fuelCoreVersion = await fs.readFile(versionFilePath, 'utf8');
  return fuelCoreVersion.trim();
};

export const setCurrentVersion = async (version: string) => {
  await fs.writeFile(versionFilePath, version);
};

export const isGitBranch = (versionFileContents: string) =>
  versionFileContents.indexOf('git:') !== -1;

const fuelCoreRepoUrl = 'https://github.com/fuellabs/fuel-core.git';

export const buildFromGitBranch = (branchName: string) => {
  sh.exec('rm -rf fuel-core-repo');
  sh.exec('rm -rf fuel-core-binaries');
  sh.exec(`git clone --branch ${branchName} ${fuelCoreRepoUrl} fuel-core-repo`, { silent: true });
  sh.exec(`cd fuel-core-repo && cargo build`, { silent: true });
  sh.exec('mkdir fuel-core-binaries');
  sh.exec('cp fuel-core-repo/target/debug/fuel-core fuel-core-binaries/fuel-core');
  sh.exec(`rm -rf fuel-core-repo`);
};
