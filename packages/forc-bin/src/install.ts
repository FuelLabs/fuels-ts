#!/usr/bin/env node

import fs from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';
import sh from 'shelljs';

const getCurrentVersion = async () => {
  const pkgJsonPath = path.join(__dirname, '../package.json');
  const version = JSON.parse(await fs.readFile(pkgJsonPath, 'utf8')).version;
  return version;
};

const getPkgPlatform = () => {
  if (process.platform === 'darwin' && process.arch === 'arm64') {
    return 'darwin_arm64';
  }
  if (process.platform === 'darwin' && process.arch === 'x64') {
    return 'darwin_amd64';
  }
  if (process.platform === 'linux' && process.arch === 'arm64') {
    return 'linux_arm64';
  }
  if (process.platform === 'linux' && process.arch === 'x64') {
    return 'linux_amd64';
  }
  throw new Error('Unsupported platform');
};

(async () => {
  const pkgPlatform = getPkgPlatform();
  const pkgVersion = await getCurrentVersion();
  const pkgName = `forc-binaries-${pkgPlatform}.tar.gz`;
  const pkgUrl = `https://github.com/FuelLabs/sway/releases/download/v${pkgVersion}/${pkgName}`;
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
