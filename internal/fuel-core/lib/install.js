#!/usr/bin/env node

import { spawnSync } from 'child_process';
import { error } from 'console';
import { existsSync, rmSync, writeFileSync, renameSync } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';

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

  const fileName = `fuel-core-${fuelCoreVersion}-${pkgPlatform}`;
  const pkgName = `${fileName}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/fuel-core/releases/download/v${fuelCoreVersion}/${pkgName}`;

  const pkgPath = join(__dirname, pkgName);
  const rootDir = join(__dirname, '..');
  const binDir = join(rootDir, 'fuel-core-binaries');

  const binPath = join(binDir, 'fuel-core');
  let versionMatches = false;

  if (existsSync(binPath)) {
    const binRawVersion = spawnSync(binPath, ['--version'], { encoding: 'utf8' }).stdout.trim();
    const binVersion = binRawVersion.match(/([.0-9]+)/)?.[0];

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
    // If a git branch is specified in the VERSION file, build from that branch
    if (isGitBranch(fuelCoreVersion)) {
      const branchName = fuelCoreVersion.split(':')[1];
      buildFromGitBranch(branchName);
      return;
    }

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

    // Cleanup
    rmSync(fileName, {
      recursive: true,
      force: true,
    });
    rmSync(pkgPath);
  }
})().catch((e) => error(e));
