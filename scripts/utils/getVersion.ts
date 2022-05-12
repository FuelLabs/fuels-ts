import bump from 'conventional-recommended-bump';
import fs from 'fs-extra';
import type { ReleaseType } from 'semver';
import semver from 'semver';

import { resolveDir } from './changePackages';

async function getReleaseType() {
  return new Promise<ReleaseType>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function cb(err: any, rec: any) {
      if (err) {
        reject(err);
        return;
      }
      resolve(rec.releaseType);
    }
    bump({ preset: `angular` }, cb);
  });
}

export async function getVersion() {
  const pkgjson = await fs.readJSON(resolveDir('./package.json'));
  const releaseType = await getReleaseType();
  return semver.inc(pkgjson.version, releaseType);
}
