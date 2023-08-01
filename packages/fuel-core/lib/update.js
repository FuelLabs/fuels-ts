#!/usr/bin/env node

import fetch from 'node-fetch';

// eslint-disable-next-line import/extensions
import { getCurrentVersion, setCurrentVersion } from './shared.js';

(async () => {
  // Get latest release
  const latestUrl = `https://api.github.com/repos/FuelLabs/fuel-core/releases/latest`;
  const latest = await fetch(latestUrl).then((r) => r.json());
  const latestVersion = latest.tag_name.replace(/^v/, '');

  // Get current version
  const currentVersion = await getCurrentVersion();

  // Update Forc
  if (currentVersion !== latestVersion) {
    // Write latest version
    await setCurrentVersion(latestVersion);
  }
})();
