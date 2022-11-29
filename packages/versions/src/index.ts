/*
  Variables:
    `FUELS` — comes from `/packages/fuels/package.json`
    `FUEL_CORE` — comes from `/services/fuel-core/Dockerfile`
    `FORC` — comes from `/packages/forc-bin/package.json`

  The CI build routine reads the aforementioned files,
  and set all the variables prior to building the packages.

  The build then replaces all `process.env.<VAR_NAME>` entries
  bellow with their respective values from the environment.

  Take a look at the /.github/workflows/release` file.
*/

export const versions = {
  FUELS: process.env.BUILD_VERSION || '~',
  FUEL_CORE: process.env.FUEL_CORE_VERSION || '~',
  FORC: process.env.FORC_VERSION || '~',
};
