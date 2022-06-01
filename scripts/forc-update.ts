#!/usr/bin/env node

import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';
import sh from 'shelljs';

const repoRoot = path.join(__dirname, '../');
const forcBinDir = path.join(repoRoot, './packages/forc-bin/');
const forcPkgJsonPath = path.join(forcBinDir, './package.json');

const getCurrentVersion = async () => {
  const version = JSON.parse(await fs.readFile(forcPkgJsonPath, 'utf8')).version;
  return version;
};

const setCurrentVersion = async (version: string) => {
  const pkgJson = await fs.readFile(forcPkgJsonPath, 'utf8');
  const wrap = (v: string) => `"version": "${v}",`;
  // Do a text replacement to not break the formatting
  const content = pkgJson.replace(wrap(JSON.parse(pkgJson).version), wrap(version));
  await fs.writeFile(forcPkgJsonPath, content);
};

(async () => {
  const repoName = 'FuelLabs/sway';

  // Get latest release
  const latestUrl = `https://api.github.com/repos/${repoName}/releases/latest`;
  const latest = await fetch(latestUrl).then((r) => r.json());
  const latestVersion = latest.tag_name.replace(/^v/, '');

  // Get current version
  const currentVersion = await getCurrentVersion();

  // Update Forc
  if (currentVersion !== latestVersion) {
    // Write latest version
    await setCurrentVersion(latestVersion);

    // Install
    sh.exec(`pnpm i`);
  }

  // Remove lockfiles so latest stdlib can be used
  sh.exec(`rm packages/**/Forc.lock`);

  // Build
  sh.exec(`pnpm build`);
})();
