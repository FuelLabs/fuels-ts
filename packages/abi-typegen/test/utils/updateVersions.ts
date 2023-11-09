import * as versionsMod from '@fuel-ts/versions';
import { versions } from '@fuel-ts/versions';
// TODO: Check if there's a better alternative to this
/**
 * This makes it possible to mock modules that are exported
 * from package's index files, using exports syntax such as:
 *
 *  export * from '...'
 *
 * https://stackoverflow.com/a/72885576
 */
// vi.mock('@fuel-ts/versions', async () => {
//   const mod = await vi.importActual('@fuel-ts/versions');
//   return {
//     __esModule: true,
//     // @ts-expect-error spreading module import
//     ...mod,
//   };
// });

export function updateVersions(hbsFile: string) {
  return hbsFile
    .replace('fuels_version', versions.FUELS)
    .replace('forc_version', versions.FORC)
    .replace('fuel_core_version', versions.FUEL_CORE);
}
