import { execSync } from 'child_process';

export async function forcVersion() {
  try {
    const version = execSync('forc --version');
    return version;
  } catch {
    throw new Error(
      'Command forc not found!\nCheck your installation or see how to install:\nhttp://fuellabs.github.io/fuelup/latest'
    );
  }
}
