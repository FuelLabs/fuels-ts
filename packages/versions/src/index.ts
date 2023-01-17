/*
  Variables:
    `FUELS` — comes from `/packages/fuels/package.json`
    `FUEL_CORE` — comes from `/services/fuel-core/Dockerfile`
    `FORC` — comes from `/packages/forc-bin/package.json`

  The CI release routine reads the aforementioned files,
  and set all the variables prior to building the packages.

  Take a look at the /.github/workflows/release` file.

  The TSUP build then replaces all `process.env.<VAR_NAME>`
  entries bellow with their respective values from the env.

  If no env variables are set, the expression `!0` seems to be
  used by TSUP, which then results to `true`. For this reason,
  we check for it and use default values instead.
*/

import { getSupportedVersions } from './lib/getSupportedVersions';

export const versions = getSupportedVersions();
