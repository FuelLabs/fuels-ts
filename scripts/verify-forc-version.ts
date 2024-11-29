import fs from 'fs/promises';
import path from 'path';

(async () => {
  const pathToForcVersionFile = path.join(__dirname, '..', 'internal', 'forc', 'VERSION');
  const forcVersion = await fs.readFile(pathToForcVersionFile, 'utf-8');
  if (forcVersion.indexOf('git:') !== -1) {
    throw new Error('Cannot publish from a git branch. Please use a release directly.');
  }
  // eslint-disable-next-line no-console
})().catch((x) => console.error(x));
