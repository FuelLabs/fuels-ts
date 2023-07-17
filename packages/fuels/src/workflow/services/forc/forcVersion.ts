import { execSync } from 'child_process';

function tryCIVersion() {
  try {
    const version = execSync('pnpm fuels-forc --version');
    return version.toString();
  } catch {
    return null;
  }
}

export function forcVersion() {
  try {
    const version = execSync('forc --version');
    return version.toString();
  } catch {
    // In CI, we use our local fuels-forc package
    const version = tryCIVersion();
    if (version) {
      return version;
    }
    throw new Error(
      'Command forc not found!\nCheck your installation or see how to install:\nhttp://fuellabs.github.io/fuelup/latest'
    );
  }
}
