import { getSystemVersions } from '@fuel-ts/versions/cli-utils';
import { detect as detectBrowser } from 'detect-browser';
import os from 'node:os';

export const snapshot = {
  toolchainVersions: getSystemVersions(),
  osPlatform: process.platform,
  nodeVersion: process.version,
  browserVersion: detectBrowser(),
  osType: os.type(),
  osArch: os.arch(),
};
