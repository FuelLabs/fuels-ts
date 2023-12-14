import { existsSync } from 'fs';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const npmWhich = require('npm-which')(__dirname);

export function findBinPath(binCommandName: string) {
  let binPath = npmWhich.sync(binCommandName);

  console.log('binPath', binPath);

  if (!existsSync(binPath)) {
    console.log('binPath does not exist');
    // The user might be using bun, which has a different structure for binaries inside node_modules
    binPath = join('node_modules', '.bin', binCommandName);
  }

  console.log('final binPath', binPath);

  return binPath;
}
