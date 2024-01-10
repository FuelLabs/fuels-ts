import { execSync } from 'child_process';
import { cpSync, rmSync } from 'fs';
import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __dirname = dirname(fileURLToPath(import.meta.url));

const supportedPlatforms = ['darwin', 'linux'];

export const checkPlatform = () => {
  if (!supportedPlatforms.includes(process.platform)) {
    throw new Error(
      `Unsupported platform ${process.platform}. If you are on Windows, please use Windows Subsystem for Linux (WSL).`
    );
  }
};

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

const versionFilePath = join(__dirname, '../VERSION');

export const getCurrentVersion = async () => {
  const fuelCoreVersion = await fs.readFile(versionFilePath, 'utf8');
  return fuelCoreVersion.trim();
};

export const setCurrentVersion = async (version) => {
  await fs.writeFile(versionFilePath, version);
};

export const isGitBranch = (versionFileContents) => versionFileContents.indexOf('git:') !== -1;

const fuelCoreRepoUrl = 'https://github.com/fuellabs/fuel-core.git';

export const buildFromGitBranch = (branchName) => {
  rmSync('fuel-core-repo', { recursive: true, force: true });
  rmSync('fuel-core-binaries', { recursive: true, force: true });
  execSync(`git clone --branch ${branchName} ${fuelCoreRepoUrl} fuel-core-repo`, { silent: true });
  execSync(`cd fuel-core-repo && cargo build`, { silent: true });
  fs.mkdirSync('fuel-core-binaries');
  cpSync('fuel-core-repo/target/debug/fuel-core', 'fuel-core-binaries/fuel-core');
  rmSync('fuel-core-repo', { recursive: true, force: true });
};
