import { execSync } from 'child_process';
import { cpSync } from 'fs';
import fs from 'fs/promises';
import path, { join, dirname } from 'path';
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
  fs.rmSync('sway-repo', { recursive: true, force: true });
  fs.rmSync('forc-binaries', { recursive: true, force: true });
  execSync(`git clone --branch ${branchName} ${swayRepoUrl} sway-repo`);
  execSync(`cd sway-repo && cargo build`);
  fs.mkdirSync('forc-binaries');
  cpSync('sway-repo/target/debug/forc', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-deploy', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-doc', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-fmt', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-lsp', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-run', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-submit', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-tx', 'forc-binaries');
  fs.rmSync('sway-repo', { recursive: true, force: true });
};
