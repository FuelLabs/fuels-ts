import { versions } from '@fuel-ts/versions';
import { getSystemVersions } from '@fuel-ts/versions/cli-utils';
import { execSync } from 'node:child_process';
import os from 'node:os';

export const snapshot = {
  sdkVersions: versions,
  toolchainVersions: getSystemVersions(),
  fuelupShow: execSync('fuelup show')?.toString('utf8'),
  nodeVersion: process.version,
  // browserVersion: detectBrowser(), ?
  osType: os.type(),
  osArch: os.arch(),
};
