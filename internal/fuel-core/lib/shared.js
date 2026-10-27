import { spawnSync } from 'child_process';
import {
  cpSync,
  mkdirSync,
  rmSync,
  readFileSync,
  writeFileSync,
  existsSync,
  copyFileSync,
} from 'fs';
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

export const versionFilePath = join(__dirname, '../VERSION');

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
  const run = (command, args, options = stdioOpts) => {
    const result = spawnSync(command, args, options);
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(`Fuel Core build command failed: ${command} ${args.join(' ')}`);
    }
  };

  if (existsSync(fuelCoreRepoDir)) {
    run('git', ['checkout', branchName], { cwd: fuelCoreRepoDir, ...stdioOpts });
    run('git', ['pull'], { cwd: fuelCoreRepoDir, ...stdioOpts });
  } else {
    run('git', ['clone', '--branch', branchName, fuelCoreRepoUrl, fuelCoreRepoDir], stdioOpts);
  }
  run('cargo', ['build', '--release'], { cwd: fuelCoreRepoDir, ...stdioOpts });

  // This is the same artifact packaged by Fuel Core's release workflow.
  const wasmPath = join(
    fuelCoreRepoReleaseDir,
    'fuel-core-upgradable-executor-cache',
    'wasm32-unknown-unknown',
    'release',
    'fuel-core-wasm-executor.wasm'
  );
  if (!existsSync(wasmPath)) {
    throw new Error(
      `Fuel Core build did not produce executor WASM at ${wasmPath}. Ensure the branch enables wasm-executor and the wasm32-unknown-unknown Rust target is installed.`
    );
  }

  const [from, to] = [fuelCoreRepoReleaseDir, fuelCoreBinDirPath];

  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });

  cpSync(join(from, 'fuel-core'), join(to, 'fuel-core'));
  cpSync(wasmPath, join(to, 'fuel-core-wasm-executor.wasm'));
  cpSync(versionFilePath, join(to, 'VERSION'));
};
