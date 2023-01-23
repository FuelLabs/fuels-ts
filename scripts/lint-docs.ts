#!/usr/bin/env node
/* eslint-disable import/no-relative-packages */

import fs from 'fs';
import path from 'path';
import sh from 'shelljs';

import forcPackageJson from '../packages/forc-bin/package.json';
import fuelsPackageJson from '../packages/fuels/package.json';

const getFuelCoreVersion = async () => {
  const filePath = path.join('./services/fuel-core/Dockerfile');

  return fs.promises
    .readFile(filePath, 'utf-8')
    .then((data) => {
      const regex = /ghcr.io\/fuellabs\/fuel-core:v(.*)/;
      const match = data.match(regex);
      if (match) {
        const version = match[1];
        return version;
      }
      throw new Error('Could not find version');
    })
    .catch((error) => {
      throw error;
    });
};

(async () => {
  // Collect versions
  const BUILD_VERSION = fuelsPackageJson.version;
  const FORC_VERSION = forcPackageJson.config.forcVersion;

  const FUEL_CORE_VERSION = await getFuelCoreVersion();

  // // Update versions
  sh.exec(
    `echo "# generated-file\nfuels: ${BUILD_VERSION}\nfuel-core: ${FUEL_CORE_VERSION}\nsway: ${FORC_VERSION}\nforc: ${FORC_VERSION}" > docs/_data/versions.yml`
  );

  // Update doc helper
  sh.exec(`pnpm -C ./scripts/typedoc-plugin-guide-builder build`);

  // clean guide
  sh.exec(`rm -rf docs/guide`);

  // Update docs
  sh.exec(`pnpm typedoc`);

  // Markdown linting and get its exit code
  const { code } = sh.exec(
    `find ./docs/guide -name "*.md" -type f -print0 | xargs -0 -n1 npx markdown-link-check -q`
  );

  if (code !== 0) {
    throw new Error('Markdown linting failed.');
  }
})();
