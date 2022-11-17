#!/usr/bin/env node

import fs from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';
import sh from 'shelljs';

import { getCurrentVersion, getPkgPlatform } from './shared';

(async () => {
  const pkgPlatform = getPkgPlatform();
  const forcVersion = await getCurrentVersion();
  const pkgName = `forc-binaries-${pkgPlatform}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/sway/releases/download/v${forcVersion}/${pkgName}`;
  const pkgPath = path.join(__dirname, pkgName);
  const binDir = path.join(__dirname, '../');

  // Download
  const buf = await fetch(pkgUrl).then((r) => r.buffer());
  await fs.writeFile(pkgPath, buf);

  // Extract
  sh.exec(`tar xzf "${pkgPath}" -C "${binDir}"`);

  // Cleanup
  await fs.rm(pkgPath);
})();
