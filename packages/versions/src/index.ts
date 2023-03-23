/*
  1) Variables
  ------------
    `FUELS` — comes from `/packages/fuels/package.json`
    `FUEL_CORE` — comes from `/services/fuel-core/Dockerfile`
    `FORC` — comes from `/packages/forc-bin/package.json`


  2)  CI
  ------------
    The CI release routine reads the aforementioned files,
    and set all the variables prior to building the packages.

    Take a look at the /.github/workflows/release` file.


  3) Pre Build
  ------------
    There's a `prebuild` script in:
     - packages/versions/package.json

    Pior to build, it will call this file:
      - packages/versions/scripts/replaceVersions.ts

    Which will replace static versions at:
      - packages/versions/src/lib/getSupportedVersions.ts

    If no env variables are set, it uses the current versions
    from the original locations mentioned in the 1st step.


  4) Build
  ------------
    By the time we get to the `build` step, everything is in
    place already and ready to be built and released.
*/

import { getSupportedVersions } from './lib/getSupportedVersions';

export const versions = getSupportedVersions();
