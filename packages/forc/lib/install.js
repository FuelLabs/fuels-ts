#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';
import { existsSync, rmSync, writeFileSync } from 'fs';
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
  const forcVersion = await getCurrentVersion();

  const pkgName = `forc-binaries-${pkgPlatform}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/sway/releases/download/v${forcVersion}/${pkgName}`;

  const pkgPath = join(__dirname, pkgName);
  const binDir = join(__dirname, '../');

  const binPath = join(binDir, 'forc-binaries', 'forc');

  let versionMatches = false;

  if (existsSync(binPath)) {
    const binRawVersion = execSync(`${binPath} --version`).toString().trim();
    const binVersion = binRawVersion.match(/([.0-9]+)/)?.[0];

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
    // If a git branch is specified in the VERSION file, build from that branch
    if (isGitBranch(forcVersion)) {
      const branchName = forcVersion.split(':')[1];
      buildFromGitBranch(branchName);
      return;
    }

    // Otherwise, download
    const buf = await fetch(pkgUrl).then((r) => r.buffer());

    if (/not found/i.test(buf.toString())) {
      throw new Error(`Version '${forcVersion}' not found\n    at ${pkgUrl}`);
    }

    writeFileSync(pkgPath, buf);

    // Extract
    execSync(`tar xzf "${pkgPath}" -C "${binDir}"`);

    // Cleanup
    rmSync(pkgPath);
  }
})().catch((e) => error(e));
