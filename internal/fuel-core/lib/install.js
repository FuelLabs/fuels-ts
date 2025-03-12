#!/usr/bin/env node

import { spawnSync } from 'child_process';
import { error } from 'console';
import { existsSync, rmSync, writeFileSync, renameSync, readFileSync, cpSync } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';

import {
  __dirname,
  buildFromGitBranch,
  getCurrentVersion,
  getPkgPlatform,
  isGitBranch,
  versionFilePath,
  // eslint-disable-next-line import/extensions
} from './shared.js';

(async () => {
  const { info } = console;

  const pkgPlatform = getPkgPlatform();
  const fuelCoreVersion = getCurrentVersion();

  // If a git branch is specified in the VERSION file, build from that branch
  if (isGitBranch(fuelCoreVersion)) {
    const branchName = fuelCoreVersion.split(':')[1];
    info(`Building fuel-core from git branch: ${branchName}`);
    buildFromGitBranch(branchName);
    return;
  }

  const fileName = `fuel-core-${fuelCoreVersion}-${pkgPlatform}`;
  const pkgName = `${fileName}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/fuel-core/releases/download/v${fuelCoreVersion}/${pkgName}`;

  const pkgPath = join(__dirname, pkgName);
  const rootDir = join(__dirname, '..');
  const binDir = join(rootDir, 'fuel-core-binaries');

  const binVersionPath = join(binDir, 'VERSION');
  let versionMatches = false;

  if (existsSync(binVersionPath)) {
    const binVersion = readFileSync(binVersionPath, 'utf8').trim();
    versionMatches = binVersion === fuelCoreVersion;
    info({
      expected: fuelCoreVersion,
      received: binVersion,
      isGitBranch: isGitBranch(fuelCoreVersion),
    });
  }

  if (versionMatches) {
    info(`fuel-core binary already installed, skipping.`);
  } else {
    // Empty the `fuel-core-binaries` directory if it exists
    rmSync(binDir, { recursive: true, force: true });

    // Download
    const buf = await fetch(pkgUrl).then((r) => r.buffer());

    if (/not found/i.test(buf.toString())) {
      throw new Error(`Version '${fuelCoreVersion}' not found\n    at ${pkgUrl}`);
    }

    writeFileSync(pkgPath, buf);

    // Extract
    spawnSync('tar', ['xzf', pkgPath, '-C', rootDir]);

    // Take the contents of the directory containing the extracted
    // binaries and move them to the `fuel-core-binaries` directory
    renameSync(`${fileName}`, binDir);
    cpSync(versionFilePath, binVersionPath);

    // Cleanup
    rmSync(fileName, {
      recursive: true,
      force: true,
    });
    rmSync(pkgPath);
  }
})().catch((e) => error(e));
