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

export function thisVersionOrDefault(version?: string | boolean) {
  if (version !== undefined) {
    const versionStr = version.toString();
    if (versionStr !== 'true') {
      return versionStr;
    }
  }
  return '0.0.0';
}

export const versions = {
  FUELS: thisVersionOrDefault(process.env.BUILD_VERSION),
  FUEL_CORE: thisVersionOrDefault(process.env.FUEL_CORE_VERSION),
  FORC: thisVersionOrDefault(process.env.FORC_VERSION),
};
