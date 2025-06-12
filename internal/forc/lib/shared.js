import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const forcBinDirPath = join(__dirname, '..', 'forc-binaries');
export const binPath = join(forcBinDirPath, 'forc');

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

const binaries = [
  'forc',
  'forc-crypto',
  'forc-debug',
  'forc-deploy',
  'forc-doc',
  'forc-fmt',
  'forc-lsp',
  'forc-migrate',
  'forc-run',
  'forc-submit',
  'forc-tx',
];

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

export const versionFilePath = join(__dirname, '../VERSION');

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
  const swayRepoDir = join(__dirname, '..', 'sway-repo');
  const swayRepoReleaseDir = join(swayRepoDir, 'target', 'release');
  const stdioOpts = { stdio: 'inherit' };

  if (existsSync(swayRepoDir)) {
    execSync(
      [
        `cd ${swayRepoDir}`,
        `git fetch origin`,
        `git checkout ${branchName}`,
        `git pull origin ${branchName}`,
      ].join('&&'),
      stdioOpts
    );

    execSync(`cd ${swayRepoDir} && cargo build --release`, stdioOpts);
  } else {
    execSync(`git clone --branch ${branchName} ${swayRepoUrl} ${swayRepoDir}`, stdioOpts);
    execSync(`cd ${swayRepoDir} && cargo build --release`, stdioOpts);
  }

  const [from, to] = [swayRepoReleaseDir, forcBinDirPath];

  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });

  binaries.forEach((binaryFileName) => {
    cpSync(join(from, binaryFileName), join(to, binaryFileName));
  });
  cpSync(versionFilePath, join(to, 'VERSION'));
};
