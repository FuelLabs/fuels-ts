/*
  1) Variables
  ------------
    `FUELS` — comes from `/packages/fuels/package.json`
    `FUEL_CORE` — comes from `/internal/fuel-core/VERSION`
    `FORC` — comes from `/internal/forc/VERSION`

  3) Pre Build
  ------------
    There's a `prebuild` script in:
     - packages/versions/package.json

    Before build, it will call this file:
      - packages/versions/scripts/replaceVersions.ts

    Which will replace static versions at:
      - packages/versions/src/lib/getBuiltinVersions.ts

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

import { getBuiltinVersions } from './lib/getBuiltinVersions';

export const versions = getBuiltinVersions();

export * from './lib/types';
export * from './lib/checkFuelCoreVersionCompatibility';
