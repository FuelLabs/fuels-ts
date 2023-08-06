#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';
import sh from 'shelljs';

import {
  __dirname,
  buildFromGitBranch,
  getCurrentVersion,
  getPkgPlatform,
  isGitBranch,
  // eslint-disable-next-line import/extensions
} from './shared.js';

(async () => {
  const { info } = console;

  const pkgPlatform = getPkgPlatform();
  const fuelCoreVersion = await getCurrentVersion();

  // If a git branch is specified in the VERSION file, build from that branch
  if (isGitBranch(fuelCoreVersion)) {
    const branchName = fuelCoreVersion.split(':')[1];
    buildFromGitBranch(branchName);
    return;
  }

  const fileName = `fuel-core-${fuelCoreVersion}-${pkgPlatform}`;
  const pkgName = `${fileName}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/fuel-core/releases/download/v${fuelCoreVersion}/${pkgName}`;

  const pkgPath = join(__dirname, pkgName);
  const rootDir = join(__dirname, '..');
  const binDir = join(rootDir, 'fuel-core-binaries');

  const binPath = join(binDir, 'fuel-core');
  let versionMatches = false;

  if (existsSync(binPath)) {
    const binRawVersion = execSync(`${binPath} --version`).toString().trim();
    const binVersion = binRawVersion.match(/([.0-9]+)/)?.[0];

    versionMatches = binVersion === fuelCoreVersion;
    info({ expected: fuelCoreVersion, received: binVersion });
  }

  if (versionMatches) {
    info(`fuel-core binary already installed, skipping.`);
  } else {
    // Empty the `fuel-core-binaries` directory if it exists
    if (existsSync(binDir)) {
      sh.rm('-rf', `${binDir}/*`);
    } else {
      // Create the `fuel-core-binaries` directory if it doesn't exist
      sh.mkdir(binDir);
    }

    // Download
    const buf = await fetch(pkgUrl).then((r) => r.buffer());
    await writeFileSync(pkgPath, buf);

    // Extract
    sh.exec(`tar xzf "${pkgPath}" -C "${rootDir}"`);

    // Take the contents of the directory containing the extracted binaries and move them to the `fuel-core-binaries` directory
    sh.mv(`${fileName}/*`, binDir);

    // Cleanup
    sh.rm('-rf', fileName);
    await rmSync(pkgPath);
  }
})();
