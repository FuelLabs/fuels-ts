import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const binPath = join(__dirname, '../forc-binaries/forc');

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
    throw new Error(
      `Unsupported platform ${process.platform}.${
        process.platform === 'win32' ? ' If you are on Windows, please use WSL.' : ''
      }}`
    );
  }
  if (process.arch !== 'arm64' && process.arch !== 'x64') {
    throw new Error(`Unsupported arch ${process.arch}`);
  }
  return platforms[process.platform][process.arch];
};

const versionFilePath = join(__dirname, '../VERSION');

export const getCurrentVersion = () => {
  const versionContents = readFileSync(versionFilePath, 'utf8');
  const forcVersion = versionContents.match(/^.+$/m)?.[0] || versionContents;
  return forcVersion;
};

export const setCurrentVersion = (version) => {
  writeFileSync(versionFilePath, version);
};

export const isGitBranch = (versionFileContents) => versionFileContents.indexOf('git:') !== -1;

const swayRepoUrl = 'https://github.com/fuellabs/sway.git';

export const buildFromGitBranch = (branchName) => {
  rmSync('sway-repo', { recursive: true, force: true });
  rmSync('forc-binaries', { recursive: true, force: true });
  execSync(`git clone --branch ${branchName} ${swayRepoUrl} sway-repo`);
  execSync(`cd sway-repo && cargo build`);
  mkdirSync('forc-binaries');
  cpSync('sway-repo/target/debug/forc', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-deploy', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-doc', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-fmt', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-lsp', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-run', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-submit', 'forc-binaries');
  cpSync('sway-repo/target/debug/forc-tx', 'forc-binaries');
  rmSync('sway-repo', { recursive: true, force: true });
};
