#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';
import sh from 'shelljs';

import { getCurrentVersion, getPkgPlatform } from './shared';

(async () => {
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
    console.info({ expected: forcVersion, received: binVersion });
  }

  if (versionMatches) {
    // eslint-disable-next-line no-console
    console.info(`Forc binary already installed, skipping.`);
  } else {
    // Download
    const buf = await fetch(pkgUrl).then((r) => r.buffer());
    await writeFileSync(pkgPath, buf);

    // Extract
    sh.exec(`tar xzf "${pkgPath}" -C "${binDir}"`);

    // Cleanup
    await rmSync(pkgPath);
  }
})();
