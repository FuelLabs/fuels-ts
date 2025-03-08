import { spawnSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const fuelCoreBinDirPath = join(__dirname, '..', 'fuel-core-binaries');
export const binPath = join(fuelCoreBinDirPath, 'fuel-core');

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
    throw new Error(
      `Unsupported platform ${process.platform}.${
        process.platform === 'win32' ? ' If you are on Windows, please use WSL.' : ''
      }`
    );
  }
  if (process.arch !== 'arm64' && process.arch !== 'x64') {
    throw new Error(`Unsupported arch ${process.arch}`);
  }
  return platforms[process.platform][process.arch];
};

const versionFilePath = join(__dirname, '../VERSION');

export const getCurrentVersion = () => {
  const fuelCoreVersion = readFileSync(versionFilePath, 'utf8');
  return fuelCoreVersion.trim();
};

export const setCurrentVersion = (version) => {
  writeFileSync(versionFilePath, version);
};

export const isGitBranch = (versionFileContents) => versionFileContents.indexOf('git:') !== -1;

const fuelCoreRepoUrl = 'https://github.com/fuellabs/fuel-core.git';

export const buildFromGitBranch = (branchName) => {
  const fuelCoreRepoDir = join(__dirname, '..', 'fuel-core-repo');
  const fuelCoreRepoReleaseDir = join(fuelCoreRepoDir, 'target', 'release');
  const stdioOpts = { stdio: 'inherit' };

  if (existsSync(fuelCoreRepoDir)) {
    spawnSync('git', ['checkout', branchName], { cwd: fuelCoreRepoDir, ...stdioOpts });
    spawnSync('git', ['pull'], { cwd: fuelCoreRepoDir, ...stdioOpts });
    spawnSync('cargo', ['build', '--release'], { cwd: fuelCoreRepoDir, ...stdioOpts });
  } else {
    spawnSync(
      'git',
      ['clone', '--branch', branchName, fuelCoreRepoUrl, fuelCoreRepoDir],
      stdioOpts
    );
    spawnSync('cargo', ['build', '--release'], { cwd: fuelCoreRepoDir, ...stdioOpts });
  }

  const [from, to] = [fuelCoreRepoReleaseDir, fuelCoreBinDirPath];

  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });

  cpSync(join(from, 'fuel-core'), join(to, 'fuel-core'));
};
