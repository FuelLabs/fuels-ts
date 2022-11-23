import { readFileSync } from 'fs';
import { join } from 'path';

export function getToolchainVersions() {
  const root = join(__dirname, '..', '..', '..');
  const dockerFilepath = join(root, 'services', 'fuel-core', 'Dockerfile');
  const forcPackagePath = join(root, 'packages', 'forc-bin', 'package.json');
  const fuelsPackagePath = join(root, 'packages', 'fuels', 'package.json');

  const dockerContents = readFileSync(dockerFilepath, 'utf-8');
  const forcJson = JSON.parse(readFileSync(forcPackagePath, 'utf-8'));
  const fuelsJson = JSON.parse(readFileSync(fuelsPackagePath, 'utf-8'));

  const dockerMatch = /fuel-core:v([0-9.]+)$/gm.exec(dockerContents);

  if (!dockerMatch || dockerMatch.length < 2) {
    throw new Error(`Could not read version from Dockerfile: \n ${dockerFilepath}`);
  }

  const FUEL_CORE = dockerMatch[1];
  const FORC = forcJson.config.forcVersion;
  const FUELS = fuelsJson.version;

  return {
    FUEL_CORE,
    FORC,
    FUELS,
  };
}
