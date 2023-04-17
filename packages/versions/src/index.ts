/* eslint-disable @typescript-eslint/triple-slash-reference */

/**
 * Referencing secondary entry-points
 */
/// <reference path="./cli.ts" />

/*
  1) Variables
  ------------
    `FUELS` — comes from `/packages/fuels/package.json`
    `FUEL_CORE` — comes from `/services/fuel-core/Dockerfile`
    `FORC` — comes from `/packages/forc-bin/package.json`

  3) Pre Build
  ------------
    There's a `prebuild` script in:
     - packages/versions/package.json

    Before build, it will call this file:
      - packages/versions/scripts/replaceVersions.ts

    Which will replace static versions at:
      - packages/versions/src/lib/getSupportedVersions.ts

    If no env variables are set, it uses the current versions
    from the original locations mentioned in the 1st step.

  3)  CI
  ------------
    As part of the CI release (1) routine, the changes made
    to the versions package by the `prebuild` routine will
    be committed by the same script (2) that handles the
    docs versioning.

      - (1) <repoRoot>/.github/workflows/release.yaml
      - (2) <repoRoot>/changeset-version-with-docs.ts

  4) Build
  ------------
    By the time we get to the `build` step, everything is in
    place already and ready to be built and released.
*/

import { getSupportedVersions } from './lib/getSupportedVersions';

export const versions = getSupportedVersions();
