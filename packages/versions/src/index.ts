/*
  Variables:
    `FUELS` — comes from `/packages/fuels/package.json`
    `FUEL_CORE` — comes from `/services/fuel-core/Dockerfile`
    `FORC` — comes from `/packages/forc-bin/package.json`

  Check the injection script at:
      ../scripts/injectVersions.ts

  NOTE:
    The entry `process.env.BUILD_VERSION` will be replaced
    at build time by the CI routine prior to release
*/

export const versions = {
  FUELS: (process.env.BUILD_VERSION || '0.21.2'),
  FUEL_CORE: '0.14.0',
  FORC: '0.30.0',
};
