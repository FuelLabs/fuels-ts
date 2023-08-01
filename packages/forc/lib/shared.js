import fs from 'fs/promises';
import path, { join, dirname } from 'path';
import sh from 'shelljs';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __dirname = dirname(fileURLToPath(import.meta.url));

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

const binPath = join(__dirname, '../forc-binaries/forc');

export default binPath;

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
  const versionContents = await fs.readFile(versionFilePath, 'utf8');
  const forcVersion = versionContents.match(/^.+$/m)?.[0] || versionContents;
  return forcVersion;
};

export const setCurrentVersion = async (version) => {
  await fs.writeFile(versionFilePath, version);
};

export const isGitBranch = (versionFileContents) => versionFileContents.indexOf('git:') !== -1;

const swayRepoUrl = 'https://github.com/fuellabs/sway.git';

export const buildFromGitBranch = (branchName) => {
  sh.exec('rm -rf sway-repo');
  sh.exec('rm -rf forc-binaries');
  sh.exec(`git clone --branch ${branchName} ${swayRepoUrl} sway-repo`);
  sh.exec(`cd sway-repo && cargo build`);
  sh.exec('mkdir forc-binaries');
  sh.exec('cp sway-repo/target/debug/forc forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-deploy forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-doc forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-fmt forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-lsp forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-run forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-submit forc-binaries/');
  sh.exec('cp sway-repo/target/debug/forc-tx forc-binaries/');
  sh.exec(`rm -rf sway-repo`);
};
