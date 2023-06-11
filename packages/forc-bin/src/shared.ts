import fs from 'fs/promises';
import path from 'path';
import sh from 'shelljs';

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

const versionFilePath = path.join(__dirname, '../VERSION');

export const getCurrentVersion = async () => {
  const forcVersion = await fs.readFile(versionFilePath, 'utf8');
  return forcVersion;
};

export const setCurrentVersion = async (version: string) => {
  await fs.writeFile(versionFilePath, version);
};

export const isGitBranch = (versionFileContents: string) =>
  versionFileContents.indexOf('git:') !== -1;

const swayRepoUrl = 'https://github.com/fuellabs/sway.git';

export const buildFromGitBranch = (branchName: string) => {
  sh.exec('rm -rf sway-repo');
  sh.exec('rm -rf forc-binaries');
  sh.exec(`git clone --branch ${branchName} ${swayRepoUrl} sway-repo`, { silent: true });
  sh.exec(`cd sway-repo && cargo build`, { silent: true });
  sh.exec('mkdir forc-binaries');
  sh.exec('cp sway-repo/target/debug/forc forc-binaries/forc');
  sh.exec(`rm -rf sway-repo`);
};
