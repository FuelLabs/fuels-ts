#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';
import { existsSync, rmSync, readFileSync, writeFileSync, cpSync } from 'fs';
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
  const forcVersion = getCurrentVersion();

  // If a git branch is specified in the VERSION file, build from that branch
  if (isGitBranch(forcVersion)) {
    const branchName = forcVersion.split(':')[1];
    info(`Building forc from git branch: ${branchName}`);
    buildFromGitBranch(branchName);
    return;
  }

  const pkgName = `forc-binaries-${pkgPlatform}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/sway/releases/download/v${forcVersion}/${pkgName}`;

  const pkgPath = join(__dirname, pkgName);
  const rootDir = join(__dirname, '..');
  const binDir = join(rootDir, 'forc-binaries');

  const binVersionPath = join(binDir, 'VERSION');

  let versionMatches = false;

  if (existsSync(binVersionPath)) {
    const binVersion = readFileSync(binVersionPath, 'utf8').trim();
    versionMatches = binVersion === forcVersion;
    info({
      expected: forcVersion,
      received: binVersion,
      isGitBranch: isGitBranch(forcVersion),
    });
  }

  if (versionMatches) {
    info(`Forc binary already installed, skipping.`);
  } else {
    const stdioOpts = { stdio: 'inherit' };

    // Otherwise, download
    const buf = await fetch(pkgUrl).then((r) => r.buffer());

    if (/not found/i.test(buf.toString())) {
      throw new Error(`Version '${forcVersion}' not found\n    at ${pkgUrl}`);
    }

    writeFileSync(pkgPath, buf);

    // Extract
    execSync(`tar xzf "${pkgPath}" -C "${binDir}"`, stdioOpts);
    cpSync(versionFilePath, binVersionPath);

    // Cleanup
    rmSync(pkgPath);
  }
})().catch((e) => error(e));
